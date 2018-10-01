#! /usr/bin/ts-node

import { Promise } from 'es6-promise'

import { MongoClient, Db } from 'mongodb';

import { settings } from '../../server/app/config/config';

import { UsersMock } from '../mocks/user';
import { RidesMock } from '../mocks/ride';
import { MessagesMock } from '../mocks/message';
import { ProspectsMock } from '../mocks/prospects';

/*
 *
 *	This will reset the mocks inside the datebase and apply the right indexes
 *
 */
export function resetMock(){ 

	return MongoClient.connect(settings.mongoUrl).then((client: MongoClient) => {

		let db: Db = client.db(settings.dbName);

		return Promise.all([
			db.collection('users').drop(),
			db.collection('rides').drop(),
			db.collection('prospects').drop(),
			db.collection('messages').drop()
		])
		.catch((err) => {

			// console.info(`Error while dropping the collections. ${ err.message }`); 

		}).then(() => {

			return db.collection('users').insert(UsersMock);

		}).then( () => {
	

			/*
			 *
			 *	This will create the geographical indexes needed to do a 
			 *	proximity research.
			 *
			 *	See https://docs.mongodb.com/manual/core/2dsphere/
			 *
			 */
			db.collection('rides').createIndex( { 'destination.geometry'  : "2dsphere" } );
			db.collection('rides').createIndex( { 'origin.geometry'  : "2dsphere" } );

			return db.collection('rides').insert(RidesMock);

		}).then( () => {

			return db.collection('prospects').insert(ProspectsMock);

		}).then( () => {

			return db.collection('messages').insert(MessagesMock);

		}).then( () => {

			/*
			 *
			 *	This will create an index on name so that no user will have the same name
			 *
			 */
			db.collection('users').createIndex( { name: 1 }, { unique: true } )

		}).catch((err:any) => {

		  console.log(`Error while inserting the mocked collection: ${ err.message }`)  

		})

	}).then( () => {

		return new Promise((accept, reject) => {	

			let redis_client = redis.createClient();
			redis_client.flushdb( (err: Error) => {
				
				if(err) reject(err);
				else accept();	

			})		
		
		})

	}).catch( (error) => {

		console.error('I could not flush the redis server', error);

	})

}

if (require.main === module) {
	
	resetMock().then( () => { 

			console.log(`INFO: Mock inserted inside database`);
			process.exit();

		}).catch( (err) => {

			console.log(`ERROR: I could not insert the mocks. ${err}`);
			process.exit();	

		});

}
