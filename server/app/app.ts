import * as fs from 'fs';
import * as restify from 'restify';

import { settings } from './config/config';

import { ridesController } from './controllers/rides';

import { catnapify } from './services/catnapify';
import { logger } from './services/logger';
import { db } from './services/db';

catnapify.initialise(settings);

db.connect().then( () => {

	try {
	
		let rides = new ridesController;

	}
	catch(err) {
		logger.error(`ERROR: Could not create ridesController`)	
		logger.error(err)
	}

	catnapify.listen()

}).catch((err:any) => {

  logger.error(`ERROR: ${settings.name} couldn\'t connect to MongoDB: ${err.message}`);

});
