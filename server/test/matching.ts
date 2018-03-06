var chai = require('chai')
  , chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
*/

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

const url: string = 'localhost:3000';

describe('rides',  () => {
	it("should get a list of rides");
	it("should get a specific ride");
	it("should add and remove riders inside ride");
	it("should delete ride when needed");

	it("should post a new ride", () => {

		chai.request(url)
			.post('/api/rides')
			.send({

					

			});

	});
	it("should post a new ride request", () => {


	});
});
