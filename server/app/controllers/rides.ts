import * as restify from 'restify';
import * as turf from '@turf/turf';
import * as moment from 'moment';


import { logger } from '../services/logger';
import { db } from '../services/db';
import { session } from '../services/session';

import { ObjectID } from 'mongodb';

import { Ride, RideType } from '../../../shared/models/ride';
import { Link } from '../../../shared/models/link';
import { Request } from '../../../shared/models/request';

const maxDistance: number = 30;

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

	@session.needAuthentification
	public put(req: any, res: restify.Response, next: restify.Next) {

		logger.info(`INFO: Catching a PUT /rides/:id request. Id is ${req.params._id}`)

		session.check

		let toinsert: Ride = {
			_id: req.params.id,
			origin: req.params.origin,
			destination: req.params.destination,
			riding_time: req.params.riding_time,
			payement: req.params.payement,
			type: req.params.type,
			riders: []
		};

		if(toinsert.type == RideType.REQUEST) toinsert.riders = [{'@id': `/api/users/${ req.user._id }` }]
		else toinsert.driver = {'@id': `/api/users/${ req.user._id }` }; 

		db.db.collection('rides').insertOne(toinsert).then((ans) => {

			res.json(201, ans);  

		}).catch((err) => {

			res.json(400, {message: err});
			logger.error(`Bad request: ${ err }`)

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

	public getMatches(req: restify.Request, res: restify.Response, next: restify.Next){

		logger.info(`INFO: Catching a /rides/:id/matches. ID is ${ req.params.id }`)

		// Select the rides arriving nearby 
		// the matching destination

		let targetRide: Ride;

		return (() => {

			return db
				.db
				.collection('rides')
				.findOne({ _id: req.params.id })

		})().then((foundRide: Ride) => {

			if(!foundRide) {

				throw 404;

			}

			targetRide = foundRide;

			let criterias = { 
				'origin.geometry': {
					$nearSphere: {
						$geometry: foundRide.origin.geometry,
						$maxDistance: maxDistance * 1000
					}},
				'_id': {'$ne': foundRide._id },
				'type': { '$ne': foundRide.type }	

			}

			logger.info(criterias)

			// If there's a driver, I need to match it with people 
			// who are requesting a ride (i.e. without driver)

			return db
				.db
				.collection('rides')
				.find(criterias)
				.toArray();

		}).then((rides: Ride[]) => {

			// Filter the rides foming from the matching destination
			let filterRides : Link[] = rides.filter( (ride: Ride) : boolean => {

				return turf.distance(ride.destination.geometry, 
					targetRide.destination.geometry) < maxDistance;	

			}).sort((a,b) => {

				// Compute a matching score based on distance, time, payement philosophy

				let destinationDistance = turf.distance(
					a.destination.geometry,
					b.destination.geometry);

				let originDistance = turf.distance(
					a.origin.geometry,
					b.origin.geometry);

				let payementDifference = a.payement - b.payement;

				const msPerWeek = (1000 * 60 * 60 * 24 * 7);

				let timeDifference = moment(a.riding_time).diff(b.riding_time);
				timeDifference = timeDifference > msPerWeek? msPerWeek : timeDifference;

				return (destinationDistance / (maxDistance * 1000)) +
					(originDistance / (maxDistance * 1000)) +
					payementDifference / 100 +
					timeDifference / msPerWeek 
			}).map((ride: Ride): Link => {

				return { '@id' : `/api/rides/${ ride._id }`}; 

			});

			res.send(200, filterRides);

		}).catch((err: any) => {

			if(err == 404) res.send(404, {message: `I couldn't find the ride ${ req.params.id }`});
			else res.send(500, err);

		})

	}

	public getRequests(req: restify.Request, res: restify.Response, next: restify.Next){

		return db
			.db
			.collection("requests")
			.find({to: {'@id': `/api/rides/${ req.params.id }`}})
			.toArray()
			.then((found) => {

				res.send(200, found);  

			})

	}

	public postRequests(req: restify.Request, res: restify.Response, next: restify.Next){

		let toinsert: Request = {

			from: req.params.from,
			to: { '@id': `/api/rides/${ req.params.id }` }

		};

		return db
			.db
			.collection("requests")
			.insertOne(toinsert).then((ans) => {

				res.json(201, ans);  

			}).catch((err) => {

				res.json(400, {message: err});

			});


	}

}
