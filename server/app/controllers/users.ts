import * as restify from 'restify';
import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Ride } from '../../../shared/models/ride';

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


	public post(req: restify.Request, res: restify.Response, next: restify.Next) {


	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

}
