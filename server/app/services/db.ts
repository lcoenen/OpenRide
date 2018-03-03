
import { MongoClient } from 'mongodb';
import { logger } from './logger'

import { settings } from '../config/config';

export namespace db {

  export let connection: MongoClient;

  export function connect() {

    return MongoClient
      .connect(settings.mongoUrl)
      .then((client:MongoClient) => {
     
        logger.info(`INFO: ${settings.name} is connected to database ${settings.mongoUrl}`);
        db.connection = client;
        return client

    });

  }

};
