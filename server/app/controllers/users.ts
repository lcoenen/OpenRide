import * as restify from 'restify';
import * as cat from 'catnapify';
import { ObjectID } from 'mongodb';

import { logger, logged } from '../services/logger';
import { db } from '../services/db';
import { session, keyName, sessionRequest } from '../services/session';

import { Promise } from 'es6-promise';

import { User, Signature, Credentials, 
	isCredentials, isUser, sanitize,
	SignupResponse } from '../../../shared/models/user';

import { hash } from '../../../shared/lib/hash';

interface userRequest extends cat.Request{

	user: User;

}

export class usersController extends cat.Controller {

	public constructor() {

		super()

	}

	static findUser = cat.before((request: userRequest) => {

		logger.trace('Trying to find an user')
		logger.trace(request.params)

		return db.db.collection('users')
			.findOne({_id: request.params.id})
			.then((user: User) => {

				logger.trace('Found the user:')
				logger.trace(user)

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
	@cat.catnapify('put', '/api/users/:id')
	@logged
	@cat.need('user')
	@cat.need((params: any) => isUser(params.user))
	@cat.need('id')
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
		user._id = request.params.id;

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

				logger.trace(`TRACE: Recieved the API key`)
				logger.trace(key)

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

	// @cat.catnapify('del', '/api/users/:id')
	// @logged
	// public del(request: cat.Request) {

	// 	throw {code: 501, response: 'Not implemented'}

	// }

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

	@cat.catnapify('get', '/api/session/me')
	@logged
	@cat.give(isUser)
	@session.needAuthentification
	public connected_user(request: sessionRequest) {

		return {code: 200, response: sanitize(request.user)};

	}

}
