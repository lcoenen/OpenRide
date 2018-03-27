import * as restify from 'restify';

import { logger } from '../services/logger';
import { db } from '../services/db';
import { session, Signature, keyName } from '../services/session';

import { ObjectID } from 'mongodb';

import { User, sanitize } from '../../../shared/models/user';
import { hash } from '../../../shared/lib/hash';


export default class usersController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a /users/:id request. Id is ${req.params.id}`)

		db
			.db
			.collection('users')
			.findOne({_id: req.params.id})
			.then((user: User) => {
				
				user.password = undefined;
				db.answeror404(res, user, req.params.id);

			}).catch((err: Error) => {

			  logger.error(`ERROR: error caught during user lookup`);
				logger.error(err)
				throw err;

			});

		return next();	

	}


	public signup(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a /users/:id PUT request (signup). Id is ${ req.params.id }`)

		try {

			let user: User = {
				_id: req.params.id,
				name: req.params.name,
				login: req.params.login,
				password: req.params.password, //	SHA encrypted
				age: req.params.age,
				place_of_origin: req.params.place_of_origin,
				reputation: req.params.reputation,
				email: req.params.email,
			}

			logger.trace(`TRACE: I'm into the signup() function of the controller`)
			logger.trace(`TRACE: here is my request`)
			logger.trace(user);
			logger.trace(`TRACE: here's the email: ${ user.email }`)

			try {

				if(!user._id){ throw Error('One argument ( _id ) is missing') }
				if(!user.name){ throw Error('One argument ( name ) is missing') }
				if(!user.login){ throw Error('One argument ( login ) is missing') }
				if(!user.password){ throw Error('One argument ( password ) is missing') }
				if(!user.age){ throw Error('One argument ( age ) is missing') }
				if(!user.place_of_origin){ throw Error('One argument ( place_of_origin ) is missing') }
				if(!user.reputation){ throw Error('One argument ( reputation ) is missing') }
				if(!user.email){ throw Error('One argument ( email ) is missing') }

			} catch (err) {
			
				logger.error(`ERROR: 400 error argument missing`)	
				logger.error(err)
				res.json(400, err)
				return
				
			}

			db
				.db
				.collection('users')
				.insertOne(user)
				.then((ans: any) => {

					logger.trace(`TRACE: correctly inserted user`)
					logger.trace(ans)

					return session.authentify(user)

				}).then((key: Signature) => {

					logger.trace(`TRACE: Recieved the API key`)
					logger.trace(key)

					res.header(keyName, key)
					res.json(201, { message: 'All right' })

				})
				.catch((err: Error) => {

				  throw err;  

				})

		} catch (err) {

			res.json(500, err);

		}
	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {

		res.json(501, {message: 'Not implemented'})

	}

	public login(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: catching a logging in request (PUT /users/me)`)


		let login: string = req.params.login; 
		let password: string = req.params.password; 


		db
			.db
			.collection('users')
			.findOne({
				login: login	
			})
			.then((user: User) => {

				// let hashedPassword = hash(password);
				/*
				 * @note It is client responsability to hash password
				 */

				if(!user) {
					res.json(404, { message: 'I didn\'t find such user, sorry' })
					logger.error(`ERROR: 404 error (PUT /users/me. No such user)`)	
				}
				else if(password == user.password)  {
					session.authentify(user).then((key: Signature) => {

						res.header('openride-key', key)
						res.json(201, { message: 'All right' })

					})
				}
				else {
					res.json(401, { message: 'Password ain\'t good, brother' })
					logger.error(`ERROR: 401 error. Password is no good`)
				}

			})


	}

	@session.needAuthentification
	public connected_user(req: any, res: restify.Response, next: restify.Next) {

		res.json(200, sanitize(req.user));

	}

	public logout(req: restify.Request, res: restify.Response, next: restify.Next) {

		res.json(501, {message: 'Not implemented'})

	}
}
