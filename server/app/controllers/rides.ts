import * as restify from 'restify';
import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Ride } from '../../../shared/models/ride';

export default class ridesController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a /rides/:id request. Id is ${req.params.id}`)

		db
			.db
			.collection('rides')
			.findOne({_id: req.params.id})
			.then((ans:any) => {
				db.answeror404(res, ans, req.params.id);
			});

		return next();

	}

	public getAll(req: restify.Request, res: restify.Response, next: restify.Next) {

		db
			.db
			.collection('rides')
			.find()
			.toArray()
			.then((ans:any) => {

				res.json(200, ans);

			});

		return next();

	}

	public post(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a POST /rides/:id request. Id is ${req.params._id}`)

		let toinsert: Ride = {
			_id: req.params._id,
			origin: req.params.origin,
			destination: req.params.destination,
			riding_time: req.params.riding_time,
			payement: req.params.payement,
			driver: {'@id': 'Louise'},
			riders: []
		};

		db.db.collection('rides').insertOne(toinsert).then((ans) => {

			res.json(201, ans);  

		}).catch((err) => {

			res.json(400, {message: err});

		});

		return next();

	}

	public patch(req: restify.Request, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a PATCH /rides/:id request. Id is ${req.params.id}`)

		db
			.db
			.collection('rides')
			.findOne({_id: req.params.id})
			.then((ans:any) => {

				logger.info(`INFO: Trying to find the ride. Found ${ans._id}`)

				if(!ans) throw `ERROR: I could not find the ride ID ${req.params.id}`;

			}).then( (): Promise<any> => {

				logger.info(`INFO: Trying to execute the request`)

				if(req.params.join) {


					logger.info(`INFO: User ${req.params.join} want to join the ride`)

					return db.db.collection('rides').updateOne({
						_id: req.params.id
					}, {
						$addToSet: { riders: { '@id': `/api/users/${req.params.join}`}}
					});

				}

				if(req.params.depart) {
					logger.info(`INFO: User ${req.params.depart} want to depart the ride`)


					return db.db.collection('rides').updateOne({
						_id: req.params.id
					}, {
						$pull: { riders: { '@id': `/api/users/${req.params.depart}`}}
					});

				}

				else {
					
					logger.info(`INFO: Nothing to patch`);
					return Promise.resolve();

				}

			}).then(() => {

				res.send(205);

			}).catch((err) => {

				logger.error(err);

				res.send(404, {message: err} );

			});

	}

	public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

	public head(req: restify.Request, res: restify.Response, next: restify.Next) {

		db
			.db
			.collection('rides')
			.findOne({_id: req.params.id})
			.then((ans:any) => {
				if(ans)	res.send(200);
				else res.send(404);
			});
	}


}
