require('app-module-path').addPath(__dirname + '/../../')

import * as fs from 'fs';
import * as restify from 'restify';

import * as corsMiddleware from 'restify-cors-middleware'

import { Server } from 'catnapify';

import { settings } from './config/config';

import { messagesController } from './controllers/messages';
import { ridesController } from './controllers/rides';
import { usersController } from './controllers/users'

import { logger } from './services/logger';
import { db } from './services/db';
import { session, keyName } from './services/session';

// catnapify.initialise(settings);

db.connect().then( () => {

	try {
		//create a catnapify instance
		let server = new Server(settings)

		let cors = corsMiddleware({
			origins: ['*'],
			allowHeaders: [keyName],
			exposeHeaders: [keyName]
		})

		server.api.pre(cors.preflight)
		server.api.use(cors.actual)

		let rides = new ridesController;
		let users = new usersController;
		let messages = new messagesController;

		server.link(rides);
		server.link(messages);
		server.link(users);

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
