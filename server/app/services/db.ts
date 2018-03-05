import * as restify from 'restify';

import { MongoClient, Db } from 'mongodb';
import { logger } from './logger'

import { settings } from '../config/config';

export namespace db {

  export let connection: MongoClient;
  export let db: Db;

  export function connect() {

    return MongoClient
      .connect(settings.mongoUrl)
      .then((client:MongoClient) => {
     
        logger.info(`INFO: ${settings.name} is connected to database ${settings.mongoUrl}`);
        connection = client;
	db = client.db(settings.dbName);
        return client;

    });

  }

	export function answeror404(res:restify.Response, ans:any, id:string){

				if(ans)	res.json(200, ans);
				else res.json(404, { message: `ERROR: I could not find the ID ${id}`} );


	}

};
