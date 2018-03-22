import * as restify from 'restify';
import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { User } from '../../../shared/models/user';

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
		
		try {

		let toInsert: User = {
			_id: req.params._id,
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



	}

	public login(req: restify.Request, res: restify.Response, next: restify.Next) {

		

	}

	public connected_user(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

	public logout(req: restify.Request, res: restify.Response, next: restify.Next) {



	}
}
