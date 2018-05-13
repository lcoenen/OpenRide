#! /usr/bin/ts-node

import { Promise } from 'es6-promise'

import { MongoClient, Db } from 'mongodb';

import { settings } from '../../server/app/config/config';

import { UsersMock } from '../mocks/user';
import { RidesMock } from '../mocks/ride';
import { MessagesMock } from '../mocks/message';
import { RequestsMock } from '../mocks/requests';

export function resetMock(){ 

	return MongoClient.connect(settings.mongoUrl).then((client: MongoClient) => {

		let db: Db = client.db(settings.dbName);

		return Promise.all([
			db.collection('users').drop(),
			db.collection('rides').drop(),
			db.collection('requests').drop(),
			db.collection('messages').drop()
		])
		.catch((err) => {

		 	console.log(`Error while dropping the collections. ${ err.message }`); 

		}).then(() => {

			return db.collection('users').insert(UsersMock.map((element) => {

				element._id = element.name;	
				return element;

			}));

		}).then( () => {
	

			db.collection('rides').createIndex( { 'destination.geometry'  : "2dsphere" } );
			db.collection('rides').createIndex( { 'origin.geometry'  : "2dsphere" } );

			return db.collection('rides').insert(RidesMock);

		}).then( () => {


			return db.collection('messages').insert(MessagesMock);

		}).then( () => {


			return db.collection('requests').insert(RequestsMock);

		})
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
