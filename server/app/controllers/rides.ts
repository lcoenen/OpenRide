import * as restify from 'restify';
import { logger } from '../services/logger';

import { Ride } from '../../../shared/models/ride';
import { RideMock } from '../../../shared/mocks/ride';

export default class ridesController {
	public get(req: restify.Request, res: restify.Response, next: restify.Next) {
	        let answer: Ride[] = RideMock; 
	        res.json(200, answer);
		return next();
	}

	public post(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

        public del(req: restify.Request, res: restify.Response, next: restify.Next) {



	}

}
