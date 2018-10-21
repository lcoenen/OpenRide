import * as restify from 'restify';
import * as cat from 'catnapify';
import { ObjectID } from 'mongodb';

import { db } from '../services/db';
import { session, keyName, sessionRequest } from '../services/session';
import { logger, logged } from '../services/logger'

import { Promise } from 'es6-promise';

import { User, Signature, Credentials, 
	isCredentials, isUser, sanitize,
	SignupResponse } from 'shared/models/user';
import { Ride } from 'shared/models/ride';
import { Link } from 'shared/models/link';

import { hash } from 'shared/lib/hash';

interface userRequest extends cat.Request{

	user: User;

}

export class usersController extends cat.Controller {

	public constructor() {

		super()

	}

	static findUser = cat.before((request: userRequest) => {

		return db.db.collection('users')
			.findOne({_id: request.params.id})
			.then((user: User) => {

				if(!user) throw {code: 404, response: 'No such user'}  
				else request.user = user;	

				return request;

			})

	})

	/*
	 *
	 * This route allow to get information about an user.
	 *
	 * It return an user or a 404 error. 
	 *
	 */

	@cat.catnapify('get', '/api/users/:id')
	@logged
	@cat.need('id')
	@cat.give(isUser)
	@usersController.findUser
	public get(request: userRequest) {

		request.user = sanitize(request.user)
		return request.user; 

	}

	/*
	 *
	 * This route allow the user to sign up
	 *
	 * It PUT the user into the system under his ID, then sign him up
	 * 
	 * @params User the user to add
	 *
	 * There's a a security to prevent having two user with the same name
	 * (i.e. recover internal errors with a .code 11000 - which means there's a duplicate)
	 * The unique indexes have to be put on name
	 *
	 */
	@cat.catnapify('post', '/api/users')
	@logged
	@cat.need('user')
	@cat.need((params: any) => isUser(params.user))
	@cat.give(['user', 'key', 'message'])
	@cat.error((err: any) => {

		if(err.code && err.code == 11000) throw {code: 401, 
			response: {
				message: 'The name or ID is a duplicate. Use PATCH for an update.',	
				code: 'DUPLICATE'
			}
		} 

	})
	public signup(request: cat.Request) {

		let user: User = request.params.user;
		user._id = request.params.user._id;

		return db
			.db
			.collection('users')
			.insertOne(user)
			.then((ans: any) => {

				/*
				 *
				 *	This will authentify the user after having inserted it
				 *	inside the database
				 *
				 */
				return session.authentify(user)

			}).then((key: Signature) => {

				/*
				 *
				 *	It it worked, answer the API KEY as a header
				 *
				 */
				request.res.header(keyName, key)

				let _res: SignupResponse = {
					user: user,
					key: key,
					message: `user ${ user.name } is signed in`
				}  

				return {code: 201, response: _res};

			})

	}

	/*
	 *
	 * This route log the user inside the system
	 *
	 * Once the user is authentified, s.he will be sent an 
	 * API key using the `openride-server-session` HTTP header
	 * Using the @needAuthentification decorator, every other 
	 * route can match the API key with the connected user
	 *
	 */
	@cat.catnapify('put', '/api/session/me')
	@logged
	@cat.need(isCredentials)
	@cat.give('user', isUser)
	@cat.give('key')
	@cat.give('message')
	public login(request: cat.Request) {

		let login: string = request.params.login; 
		let password: string = request.params.password; 

		return db
			.db
			.collection('users')
			.findOne({
				$or: [
					{ name: login },
					{ email: login },
				]
			})
			.then((user: User) : Promise<cat.Answer<any>> => {

				// let hashedPassword = hash(password);
				/*
				 * @note It is client responsability to hash password
				 */

				if(!user) 
					return Promise.reject({code: 404, response: {
						message: 'I didn\'t find such user, sorry'  
					}})
				else {

					if(password == user.password)  {
						return session.authentify(user).then((key: Signature) => {

							request.res.header(keyName, key)
							return {code: 201, response: {
								message: 'All right',
								key: key,
								user: sanitize(user)
							}}

						})
					}
					else
						return Promise.reject({code: 401, response: { message: 'Password ain\'t good, brother'}})

				}

			})


	}

	/*
	 *
	 * 	This route will edit an user
	 *
	 */
	@cat.catnapify('put', '/api/users/:id')
	@logged
	@cat.need('updatedUser')
	@cat.need((params: any) => isUser(params.updatedUser))
	@cat.give(['user','status'])
	@session.needAuthentification
	public edit(request: sessionRequest) {

		return db.db.collection('users').updateOne({ _id: request.user._id }, { '$set': request.params.updatedUser }).then((answer: any) => {
		
			return { status: 'ok', user: request.params.updatedUser };

		})

	}
	
	/*
	 *
	 * This route return the connected user
	 *
	 */
	@cat.catnapify('get', '/api/session/me')
	@logged
	@cat.give(isUser)
	@session.needAuthentification 
	public connected_user(request: sessionRequest) {

		return {code: 200, response: sanitize(request.user)};

	}


	/*
	 * 
	 * This return a list of link to all rides linked to an user
	 *
	 */
	@cat.catnapify('get', '/api/users/:id/rides')
	@logged
	@cat.need('id')
	public my_rides(request: sessionRequest) {

		return db.db.collection('rides').find({
			'$or': [
				{
					driver: {'@id': `/api/users/${ request.params.id }`}	
				},
				{
					riders: {'@id': `/api/users/${ request.params.id }`}	
				}
			]	
		})
		.toArray()
		.then((rides: Ride[]) => {

			return rides.map((ride: Ride): Link => {

				return {'@id': `/api/rides/${ ride._id }`} 

			})  

		})

	}

	/*
	 *
	 * This will sign out the user
	 *
	 */
	@cat.catnapify('del', `/api/session/me`)
	@logged
	@session.needAuthentification
	public logOut(request: sessionRequest){
	
		return session.logOut(request.key).then(() =>
			{ message: 'All right' })
	
	}

}
