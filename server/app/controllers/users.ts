import * as restify from 'restify';
import * as cat from 'catnapify';
import { ObjectID } from 'mongodb';

import { logger, logged } from '../services/logger';
import { db } from '../services/db';
import { session, Signature, keyName, sessionRequest } from '../services/session';

import { Promise } from 'es6-promise';

import { User, Credentials, isCredentials, isUser, sanitize } from '../../../shared/models/user';

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
	 */
	@cat.catnapify('put', '/api/users/:id')
	@logged
	@cat.need('user')
	@cat.need((params: any) => isUser(params.user))
	@cat.need('id')
	public signup(request: cat.Request) {

		let user: User = request.params.user;
		user._id = request.params.id;

		return db
			.db
			.collection('users')
			.insertOne(user)
			.then((ans: any) => {

				return session.authentify(user)

			}).then((key: Signature) => {

				logger.trace(`TRACE: Recieved the API key`)
				logger.trace(key)

				request.res.header(keyName, key)
				return {code: 201, response: {
					user: user,
					key: key,
					message: `user ${ user._id } is signed in`
				} }

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
	public login(request: cat.Request) {

		let login: string = request.params.login; 
		let password: string = request.params.password; 

		return db
			.db
			.collection('users')
			.findOne({
				_id: login	
			})
			.then((user: User) : Promise<cat.Answer<any>> => {

				// let hashedPassword = hash(password);
				/*
				 * @note It is client responsability to hash password
				 */

				if(!user) 
					return Promise.resolve({code: 404, response: 'I didn\'t find such user, sorry'  })
				else {

					if(password == user.password)  {
						return session.authentify(user).then((key: Signature) => {

							request.res.header(keyName, key)
							return {code: 201, response: {
								message: 'All right',
								key: key 
							}}

						})
					}
					else
						return Promise.resolve({code: 401, response: 'Password ain\'t good, brother'})

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
