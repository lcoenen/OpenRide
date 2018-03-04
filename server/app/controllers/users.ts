import * as restify from 'restify';
import { logger } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Ride } from '../../../shared/models/ride';
import { RideMock } from '../../../shared/mocks/ride';

export default class usersController {

	public get(req: restify.Request, res: restify.Response, next: restify.Next) {

                logger.info(`Catching a /users/:id request. Id is ${req.params.id}`)

	}

	public getAll(req: restify.Request, res: restify.Response, next: restify.Next) {

	}

	public post(req: restify.Request, res: restify.Response, next: restify.Next) {

                let toinsert: Ride = {
		  origin: req.params.origin,
		  destination: req.params.destination,
		  riding_time: req.params.riding_time,
		  payement: req.params.payement,
		  driver: {'@id': 'mememe'},
		  riders: []
		};

                db.db.collection('users').insertOne(toinsert).then((ans) => {
		
		    res.json(201, ans);  
		
		});

		return next();

	}

        public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

	public invitables(req: restify.Request, res: restify.Response, next: restify.Next) {

                 

	}

}
