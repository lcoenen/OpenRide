import * as restify from 'restify';

import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { User } from '../../../shared/models/user';
import { hash } from '../../../shared/lib/hash';

let session:any = require('restify-session');

session({
	debug : true,
  ttl   : 2
});

export default class usersController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`Catching a /users/:id request. Id is ${req.params.id}`)

		db
			.db
			.collection('users')
			.findOne({_id: req.params.id})
			.then((ans:any) => {

				db.answeror404(res, ans, req.params.id);

			});

		return next();	

	}


	public signup(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a /users/:id PUT request (signup). Id is ${ req.params.id }`)

		try {

		let toInsert: User = {
			_id: req.params.id,
			name: req.params.name,
			login: req.params.login,
			password: req.params.password, //	SHA encrypted
			age: req.params.age,
			place_of_origin: req.params.place_of_origin,
			reputation: req.params.reputation,
			email: req.params.email,
		}

		if(!toInsert._id){ throw Error('One argument is missing') }
		if(!toInsert.name){ throw Error('One argument is missing') }
		if(!toInsert.login){ throw Error('One argument is missing') }
		if(!toInsert.password){ throw Error('One argument is missing') }
		if(!toInsert.age){ throw Error('One argument is missing') }
		if(!toInsert.place_of_origin){ throw Error('One argument is missing') }
		if(!toInsert.reputation){ throw Error('One argument is missing') }
		if(!toInsert.email){ throw Error('One argument is missing') }

		db
			.db
			.collection('users')
			.insertOne(toInsert)
			.then((ans: any) => {
				res.json(201, ans);
			})

		} catch (err) {

			res.json(400, err);

		}
	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {

		res.json(501, {message: 'Not implemented'})

	}

	public login(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: catching a logging in request (PUT /users/me)`)
		logger.info(`INFO: user is ${ req.params.login }`)

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

				console.log(`login ${ login }`)
				if(user) console.log(`user ${ user._id }`)
				console.log(`password ${ password }`)
				if(user) console.log(`user.password ${ user.password }`)

				if(!user)
					res.json(404, { message: 'I didn\'t find such user, sorry' })
				else if(password == user.password) 
					res.json(201, { message: 'All right' })
				else res.json(400, { message: 'Password ain\'t good, brother' })

			})
			

	}

	public connected_user(req: restify.Request, res: restify.Response, next: restify.Next) {

		res.json(501, {message: 'Not implemented'})

	}

	public logout(req: restify.Request, res: restify.Response, next: restify.Next) {

		res.json(501, {message: 'Not implemented'})

	}
}
