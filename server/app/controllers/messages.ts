import * as restify from 'restify';

import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Message } from '../../../shared/models/message';

export default class messagesController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a /rides/:id/messages request. Id is ${req.params.id}`)

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
	
		logger.info(`INFO: Catching a POST /rides/:id/messages request. Id is ${req.params.id}`)

		let toinsert: Message = {
			ride: {'@id': `/api/rides/${req.params.id}`},
			message: req.params.message,
			author: {'@id': `/api/rides/${req.params.author}`},
			date: req.params.date
		};

		db.db.collection('messages').insertOne(toinsert).then((ans) => {

			res.json(201, ans);  

		}).catch((err) => {
		
			res.json(400, {message: err});
		
		});

		return next();

	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

	public invitables(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

}
