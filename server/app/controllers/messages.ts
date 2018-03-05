import * as restify from 'restify';

import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Ride } from '../../../shared/models/ride';

export default class messagesController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`Catching a /rides/:id/messages request. Id is ${req.params.id}`)
		db
			.db
			.collection('rides')
			.findOne({_id: req.params.id})
			.then((ans:any) => {

				if(!ans) throw `ERROR: I could not find the ride ID ${req.params.id}`;

			}).then(() =>{

				let tofind = {
					'ride': { '@id': `/api/rides/${req.params.id}`}
				};

				logger.info(`INFO: looking for ${JSON.stringify(tofind)}`);

				let ans = db
					.db
					.collection('messages')
					.find({
						'ride': { '@id': `/api/rides/${req.params.id}`}
					}).toArray().then((ans) => {

						logger.info(`INFO: answer from Mongo is ${JSON.stringify(ans)}`);

						db.answeror404(res, ans, req.params.id);

					});
			}).catch((err) => {

				logger.error(err);

				res.send(404, {message: err} );

			});

		return next();	

	}


	public post(req: restify.Request, res: restify.Response, next: restify.Next) {


	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

	public invitables(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

}
