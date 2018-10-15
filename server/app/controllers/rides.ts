import * as restify from 'restify';
import * as turf from 'turf';
import * as moment from 'moment';

import { ObjectID } from 'mongodb';
import * as cat from 'catnapify';

import { logger, logged } from '../services/logger';
import { db } from '../services/db';
import { session, sessionRequest } from '../services/session';

import { Ride, RideType, isRide } from 'shared/models/ride';
import { Link, idLink } from 'shared/models/link';
import { Prospect, ProspectType } from 'shared/models/prospect';

const maxDistance: number = 30;


function isArrayOfRides(x: any): x is Ride[] {
	return x.filter != undefined &&
		!(x.filter((v:any) => {
			return !isRide(v);	
		}).length)
}

export class ridesController extends cat.Controller {

	public constructor() {

		super()

	}


	/*
	 *
	 * Check that the rides have a driver (is 
	 * a proposition and not a request)
	 *
	 */
	static checkRideHasDriver = cat.before((request: cat.Request) => {

		return db.db.collection('rides')
			.findOne({'_id': request.params['id']})
			.then((ride: Ride) => {


				if(ride.driver == undefined) throw {code: 404, response: 'This ride have no driver'};
				return request;

			})

	})

	/*
	 *
	 * Route allowing to get a specific ride
	 *
	 */

	@cat.catnapify('get', '/api/rides/:id')
	@logged
	@cat.need('id')
	@cat.give(isRide)
	public get(request: cat.Request) {

		return db
			.db
			.collection('rides')
			.findOne({_id: request.req.params.id})
			.then((ans:Ride) : cat.Answer<Ride> => {
				if(!ans) throw { code: 404, response: 'ERROR: No such ride' } ;
				return { code: 200, response: ans } ;
			});

	}

	/*
	 *
	 * Route allowing to get all rides
	 *
	 * @return array An array of rides
	 *
	 */
	@cat.catnapify('get', '/api/rides')
	@logged
	@cat.give(isArrayOfRides)
	public getAll(request: cat.Request) {

		throw {code: 401, response: 'Guru meditation' }

		return db
			.db
			.collection('rides')
			.find()
			.toArray()
			.then((rides: Ride[]) => {

				return {code: 200, response: rides}

			}) /* It should work without this, but out of security, I return a proper Answer object */

	}

	/*
	 *
	 * This route allow to publish a new ride.
	 *
	 * In order to do that, the user have to PUT a new ride at the desired URL.
	 * The request have to contains all the field needed for a ride (see shared/models/ride)
	 *
	 */
	@cat.catnapify('put', '/api/rides/:id')
	@logged
	@cat.need(isRide)
	@session.needAuthentification
	public put(request: sessionRequest) {

		let toinsert: Ride = {
			_id: request.params.id, /* id is from the URL */
			origin: request.params.origin,
			destination: request.params.destination,
			riding_time: request.params.riding_time,
			payement: request.params.payement,
			type: request.params.type,
			riders: []
		};

		if(toinsert.type == RideType.REQUEST) toinsert.riders = [{'@id': `/api/users/${ (<sessionRequest>request).user._id }` }]
		else toinsert.driver = {'@id': `/api/users/${ (<sessionRequest>request).user._id }` }; 

		return db.db.collection('rides').insertOne(toinsert).then((ans) => {

			return { code: 201, response: 'created' };

		})

	}

	/* 
	 *
	 * This route is used to join or depart to/from a ride
	 *
	 * @args join should be set to the user that want to join
	 * @args depart should be set to the user that want to depart from the ride
	 * @args id is the ride id (set in the route)
	 *
	 * The join or depart argument should be a valid user ID
	 *
	 */
	@cat.catnapify('patch', '/api/rides/:id')
	@logged
	@cat.need((params: any) => (params.join !== undefined) || (params.depart !== undefined))
	@ridesController.checkRideHasDriver
	@session.needAuthentification
	public patch(request: sessionRequest) {

		return db
			.db
			.collection('rides')
			.findOne({_id: request.req.params.id})
			.then((ans:any) => {

				/* 
				 *
				 * If we cannot find the corresponding ride, throw an error 
				 *
				 */

				if(!ans) throw `ERROR: I could not find the ride ID ${request.req.params.id}`;

				return ans;

			}).then((ride: Ride) => {

				let params = request.params;

				/*
				 *
				 * This will throw an unauthorized error if the requestor is not the right person
				 *
				 * - To join, a prospect should exist
				 * - To depart, the requestor should be the rider or the driver
				 *
				 */

				// Find the prospects that could match

				// Requestor is the originator of the request
				let requestor = request.user._id;

				// target is the user supposed to join or depart the ride
				let target = params.join ? params.join : params.depart;

				return db.db.collection('prospects')
					.find({'$or': [
						{ with: {'@id': `/api/rides/${ request.params.id }`}},
						{ ride: {'@id': `/api/rides/${ request.params.id }`}}
					]})
					.toArray()
					.then((prospects: Prospect[]) => {

						// For each prospects 
						// Promise.all is there to flatten the Promise<prospects>[] into Promise<prospects[]>

						return Promise.all(prospects.map((prospect: Prospect) => {

							let populatedProspect:any = prospect;

							// Find the rides

							return db.db.collection('rides').findOne({
								'_id': idLink(<Link>prospect.with)
							}).then((withRide: Ride) => {

								populatedProspect.with = withRide;  

							}).then(( ) => {

								return db.db.collection('rides').findOne({
									'_id': idLink(<Link>prospect.ride)	
								})

							}).then((ride: Ride) => {

								populatedProspect.ride = ride;
								return populatedProspect;

							})  

						}))

					}).then((populatedProspects: any[]) => {

						// Check that the users ID checks out

						logger.debug('Trying to check that a previous connection exists')
						logger.debug(populatedProspects);

						populatedProspects = populatedProspects.filter((prospect: any) => {

							// rider is the link to the rider in the prospect 
							let rider: string;

							if(prospect.type == ProspectType.APPLY) 
								rider = idLink(prospect.with.riders[0])		
							else 
								rider = idLink(prospect.ride.riders[0])

							// prospectTarget is the person whose action is required by the prospect
							// (if it's an invite, it's the rider. If it's an application, it's the driver)
							let prospectTarget: string = idLink((
								(prospect.ride['type'] == RideType.OFFER)? 
								prospect.ride.driver: 
								prospect.ride.riders[0]))

							// Keep all the prospect with a rider equal to the user supposed to enter the ride
							// Exclude it if the request doesn't come from the person being invited / requested
							
							logger.debug(`TRACE: requestor ${ requestor }`)
							logger.debug(`DEBUG: prospectTarget ${ prospectTarget }`)

							logger.debug(`rider:`, rider)
							logger.debug(`target:`, target)

							return rider == target && requestor == prospectTarget;

						})

						// Check that the requestor is the owner of the prospect ride
						if(populatedProspects.length == 0) 
							throw {code: 401, 
								response: 'This user have no previous connection with this ride. First invite the ride or request to join the ride.'}

						// There should only be one left
						return populatedProspects[0]

					})

			}).then( (prospect: Prospect): Promise<any> => {

				if(request.req.params.join) {

					// This is a Ride because it have been populated
					let requestRide: Ride = <Ride>(prospect.type == ProspectType.APPLY? prospect.with: prospect.ride);

					/* 
					 *
					 * Adding the user to the set in MongoDB
					 * It is done using the Link format (see JsonP) { '@id': url }
					 * This is to ensure respect of the hyperlink format
					 * and thus that is's REST compliant
					 *
					 */
					return <Promise<any>> db.db.collection('rides').updateOne({
						_id: request.req.params.id
					}, {
						$addToSet: { riders: { '@id': `/api/users/${request.req.params.join}`}},
					}).then(() => {

					/*
					 * 
					 * The request will also be added to the 'requests' property
					 *
					 */

						return <Promise<any>> db.db.collection('rides').updateOne({
							_id: request.req.params.id
						}, {
							$addToSet: { requests: { '@id': `/api/rides/${requestRide._id}`}  }
						})

					}).then(() => {

						logger.debug('This prospect will be accepted', prospect);
					
					/*
					 *
					 * The corresponding prospect will be accepted 
					 *
					 */
					 return db.db.collection('prospects').updateOne(
						 { '_id': prospect._id },
						 {'$set': { 'accepted': true }})
					
					}).then(() : cat.Answer<string> => {

						return {code: 204, response: 'The user have been added'} 

					})
						
				}
				else {

					/* 
					 *
					 * If the 'depart' parameters is set, then remove the user from the set
					 *
					 */
					return db.db.collection('rides').updateOne({
						_id: request.req.params.id
					}, {
						$pull: { riders: { '@id': `/api/users/${request.req.params.depart}`}}
					}).then(( ) : cat.Answer<string> => {

						return {code: 204, response: 'The user have been removed'} 

					});

				}

			})

	}

	/*
	 *
	 * This route will delete a ride
	 *
	 */
	@cat.catnapify('del', '/api/rides/:id')
	@logged
	@cat.need('id')
	public del(request: cat.Request) {

		return db
			.db
			.collection('rides')
			.deleteOne({'_id': request.params['id']})
			.then(( ) => {

				logger.debug(`Deleting ${ request.params['id'] }`)
				return {code: 204, response: 'deleted'};  

			})

	}

	/*
	 *
	 * This route is used to know if the ride exists
	 *
	 * It returns a 200 if the ride is found in the database. 400 otherwise.
	 *
	 */
	@cat.catnapify('head', '/api/rides/:id')
	@logged
	@cat.need('id')
	public head(req: cat.Request) {

		return db
			.db
			.collection('rides')
			.findOne({_id: req.params.id})
			.then((ans:any) => {
				if(ans) return {code: 200, response: ''}	
				else return {code: 400, response: ''} 
			});

	}

	/*
	 * This route is used to return the rides matching the target
	 *
	 * The matching algorythm is based on four parameters:
	 *   - Origin
	 *   - Destination
	 *   - Payement option
	 *   - Time of departure
	 *
	 *	If everything goes smoothly, it should return a 200 with a set of Link objects
	 *	(i.e. an array {'@id': url} objects) representing the matched rides. Every URL should thus be
	 *	in the /api/rides/XXX domain.
	 *
	 */
	@cat.catnapify('get', '/api/rides/:id/matches')
	@logged
	@cat.need('id')
	@cat.give((links: Link[]) => {

		// links is an array
		return <boolean>Array.isArray(links) && 
			// everythink in links is a Link (have an @id property)
			(links.filter((link) => link['@id'] !== undefined).length != 0 ||
				// or links is empty
				links.length == 0	
			)

	})
	public getMatches(req: cat.Request){

		/*
		 *
		 * Select the rides arriving nearby 
		 * the matching destination
		 *
		 */

		let targetRide: Ride;

		return (() => {

			/*
			 *
			 * Selecting the target ride
			 *
			 */
			return db
				.db
				.collection('rides')
				.findOne({ _id: req.params.id })

		})().then((foundRide: Ride) => {

			if(!foundRide) {

				throw { code: 404, response: "I cannot find the target ride" };

			}

			targetRide = foundRide;

			let criterias = { 
				'origin.geometry': {
					$nearSphere: {
						$geometry: foundRide.origin.geometry,
						$maxDistance: maxDistance * 1000
					}},
				'_id': {'$ne': foundRide._id },
				'type': { '$ne': foundRide.type },
				// Ride I'm not already in 
				'requests' : {'$nin': [{ '@id': `/api/rides/${req.params.id}`}]}
			}

			/*
			 *
			 * If there's a driver, I need to match it with people 
			 * who are requesting a ride (i.e. without driver)
			 *
			 */

			return db
				.db
				.collection('rides')
				.find(criterias)
				.toArray();

			}).then((rides: Ride[]) => {

				/*
				 * 
				 * Filter the ride pair for which no prospects exists yet
				 *
				 */	 

				 let ridesLinks: Link[] = rides.map( (ride: Ride) =>
				 	({ '@id' : `/api/rides/${ride._id}` }));

				// Find all the prospects that could match
			
				let request = {
			 		'$or': [
						{
							'with': { '@id': `/api/rides/${targetRide._id}`},
							'ride': { '$in': ridesLinks }
						},
						{
							'with': { '$in': ridesLinks },
							'ride': {'@id': `/api/rides/${targetRide._id}`}
						}],
					'accepted': true
					}

					return db.db.collection('prospects').find(request).toArray().then( (prospects: Prospect[]) : Link[] => {
					
					// Extract the adjacent ride (the one that is not the target)
			
						return prospects.map( (prospect: Prospect) =>
							(<Link>prospect.with)['@id'] == `/api/rides/${targetRide._id}` ?
							<Link>prospect.ride: <Link>prospect.with)

					}).then( (adjacents: Link[]) =>  

					// Remove rides that already have been prospected

						rides.filter( (ride: Ride) => 

							adjacents.filter( (adj: Link) => 

								adj['@id'] == `/api/rides/${ride._id}`	

							).length == 0

						)

					)
			
			}).then((rides: Ride[]) => {

			/*
			 *
			 * Filter the rides coming from the matching destination
			 *
			 */
			let filterRides : Link[] = rides.filter( (ride: Ride) : boolean => {

				return turf.distance(ride.destination, 
					targetRide.destination) < maxDistance;	

			}).sort((a,b) => {

				/*
				 *
				 * Compute a matching score based on distance, time, payement philosophy
				 *
				 */

				let destinationDistance = turf.distance(
					a.destination,
					b.destination);

				let originDistance = turf.distance(
					a.origin,
					b.origin);
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

			/*
			 *
			 * Return the filtered ride with a code 200
			 *
			 */
			return filterRides;

		})
	}

	/*
	 *
	 * This entry point is used to get the request associated with a ride
	 *
	 * It gives a set of Link[] pointing to every users
	 * having requesting to join the ride.
	 *
	 *
	 * Will always answer a 200 with what he found
	 *
	 */
	@cat.catnapify('get', '/api/rides/:id/prospects')
	@logged
	@cat.need('id')
	// @cat.give((links: Link[]) => <boolean>Array.isArray(links) && links.filter((link) => link['@id'] !== undefined).length != 0)
	public getProspects(req: cat.Request){

		return db
			.db
			.collection("prospects")
			.find({'$or': [
				{with: {'@id': `/api/rides/${ req.params.id }`}},
				{ride: {'@id': `/api/rides/${ req.params.id }`}}
				],
				accepted: false})
			.toArray()

	}

	/*
	 *
	 * This entry point allow the client to post a ride request.
	 *
	 * @params ride The target ride. 
	 * @params with The origin ride, the one that's owned by the user
	 *
	 */
	@cat.catnapify('post', '/api/rides/:ride/prospects')
	@logged
	@cat.need(['ride', 'with'])
	@session.needAuthentification
	public postProspects(req: sessionRequest){

		/*
		 *
		 * Check that the user is the owner of the 'with' ride
		 * 
		 */
		return db.db.collection('rides')
			.findOne({'_id': idLink(req.params.with['@id'])})
			.then((withRide: Ride) => {

				if(!withRide) throw { code: 404, response: 'There is no such ride' }

				let owner: Link = withRide.type == RideType.REQUEST?
					(<Link[]>withRide.riders)[0] : <Link>withRide.driver;

				logger.debug(`owner is ${ owner['@id'] }`)
				logger.debug(`connected user is ${ req.user._id }`)

				if(idLink(owner) != req.user._id) {

					throw { code: 401, response: 'It is not your ride, sorry' };

				}	

				return withRide;

			})	

		/*
		 *
		 * Add the prospects with the right type
		 *
		 */
			.then((withRide: Ride ) => {


				logger.debug('Found a withRide: ', withRide)
				logger.debug('withRide type: ', withRide.type == RideType.REQUEST ? 'Request' : 'Offer')

				let toInsert: Prospect = {
					ride: <Link>{'@id': `/api/rides/${ req.params.ride }`},
					with: req.params.with, // 'with' is already a Link
					type: ((withRide.type == RideType.REQUEST) ? 
						ProspectType.APPLY: ProspectType.INVITE),
						accepted: false
				};

				logger.debug('toInsert', toInsert);
				logger.debug('toInsert type', toInsert.type == ProspectType.INVITE? 'Invite': 'Apply')

				return db.db.collection('prospects')
					.insertOne(toInsert).then((ans: any) => {

						return { code: 201, response: 'Created' };  

					})

			})


	}

	/*
	 * 
	 * Return the myRides object for the my-rides view
	 *
	 */
	@cat.catnapify('get', '/api/session/me/rides')
	@logged
	@session.needAuthentification
	public my_rides(req: sessionRequest) {
	

		logger.info(`INFO: req.user`, req.user)

		let request = {
			'$or': [
				{'driver': { '@id': `/api/users/${ req.user._id }`}},
				{'riders': { '@id': `/api/users/${ req.user._id }`}}
			],

		}

		logger.info(`INFO: Trying to find `, request)
		logger.info(request)
		
		return db.db.collection('rides').find(request).toArray()
		.then((rides: Ride[]) => {

		 	logger.info(`INFO: returned`) 
			logger.info(rides)

			return rides;

		})

	}

}
