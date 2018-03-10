
import { MongoClient, Db } from 'mongodb';

import { settings } from '../../server/app/config/config';

import { UsersMock } from '../mocks/user';
import { RidesMock } from '../mocks/ride';
import { MessagesMock } from '../mocks/message';

export function resetMock(){ 

	return MongoClient.connect(settings.mongoUrl).then((client: MongoClient) => {

		let db: Db = client.db(settings.dbName);

		return (() => {

			return db.collection('rides').drop()

		})().then(() => {

		  
			return db.collection('users').drop();

		}).then(() => {

			return db.collection('messages').drop();

		}).then(() => {

			return db.collection('users').insert(UsersMock.map((element) => {

				element._id = element.name;	
				return element;

			}));

		}).then( () => {

			return db.collection('rides').insert(RidesMock);

		}).then( () => {

			return db.collection('messages').insert(MessagesMock);

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
