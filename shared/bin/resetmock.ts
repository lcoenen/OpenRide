
import { MongoClient, Db } from 'mongodb';

import { settings } from '../../server/app/config/config';

import { UsersMock } from '../mocks/user';
import { RidesMock } from '../mocks/ride';

MongoClient.connect(settings.mongoUrl).then((client: MongoClient) => {

	let db: Db = client.db(settings.dbName);

	db.collection('rides').drop();
	db.collection('users').drop();
	db.collection('messages').drop();

	db.collection('users').insert(UsersMock.map((element) => {
		element._id = element.name;	
		return element;
	
	}));

	db.collection('rides').insert(RidesMock);

}).catch((err) => {
	
  console.log(`ERROR: Could not connect to Mongo. ${err}`);	
	
});
