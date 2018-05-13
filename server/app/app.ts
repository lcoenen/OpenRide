import * as fs from 'fs';
import * as restify from 'restify';

import { Server } from 'catnapify';

import { settings } from './config/config';

import { ridesController } from './controllers/rides';

import { logger } from './services/logger';
import { db } from './services/db';

// catnapify.initialise(settings);

db.connect().then( () => {

	try {
		//create a catnapify instance
		let server = new Server(settings)
		let rides = new ridesController;

		console.log(`Trying to link ride`)
		server.link(rides);

		server.listen()

		logger.info(`INFO: Server is listening on port ${ settings.port }`)

	}
	catch(err) {

		logger.error(`ERROR: Could not create server`)	
		logger.error(err)

	}

}).catch((err:any) => {

  logger.error(`ERROR: ${settings.name} couldn\'t connect to MongoDB: ${err.message}`);

});
