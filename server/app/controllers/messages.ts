import * as restify from 'restify';
import * as cat from 'catnapify';

import { logger, logged } from '../services/logger';
import { db } from '../services/db';

import { ObjectID } from 'mongodb';

import { Message, isMessage } from '../../../shared/models/message';
import { Ride } from '../../../shared/models/ride';

let rideExist = cat.before((request: cat.Request) => {

  return db.db.collection('rides')  
		.findOne({_id: request.params.id})
		.then((ride: Ride) => {

			if(!ride) throw {code: 404, response: 'No such ride'};
			return request;

		})	

})

export class messagesController extends cat.Controller {

	/*
	 *
	 * Getting the messages for a specific ride
	 *
	 * Should fail if the ride doesn't exists
	 *
	 */
	@cat.catnapify('get', '/api/rides/:id/messages')
	@logged
	@cat.need('id')
	@rideExist
	public get(request: cat.Request) {

		return db
			.db
			.collection('rides')
			.findOne({_id: request.params.id})
			.then((ans:any) => {

				if(!ans) throw `ERROR: I could not find the ride ID ${request.params.id}`;

			}).then(() =>{

				return db
					.db
					.collection('messages')
					.find({
						'ride': { '@id': `/api/rides/${request.params.id}`}
					}).toArray()

			})

	}

	/*
	 *
	 * Posting a message
	 *
	 */
	@cat.catnapify('post', '/api/rides/:id/messages')	
	@logged
	@cat.need((params: any) => isMessage(params.message))
	@cat.need('id')
	@rideExist
	public post(request: cat.Request) {
	
		return db.db.collection('messages').insertOne(request.params.message).then((ans) => {

			return {code: 201, response: 'ok'}

		})
	
	}

	@cat.catnapify('del', '/api/rides/:id/messages/:msg')
	@logged
	@cat.need(['id', 'msg'])
	@rideExist
	public del(request: cat.Request) {

		return db.db.collection('message').deleteOne({'_id': request.params.msg}).then(( ) => {

			return {code: 204, response: 'deleted'}  

		})	

	}

	/*
	 *
	 * This route is to edit a message
	 *
	 */
	@cat.catnapify('post', '/api/rides/:id/messages/:msg')
	@logged
	@cat.need((params: any) => isMessage(params.message))
	@cat.need(['id', 'msg'])
	@rideExist
	public edit(request: cat.Request) {

		// return db.db.collection('message').deleteOne({'_id': request.params.msg}).then(( ) => {

		// 	return {code: 204, response: 'deleted'}  

		// })	

	}

}
