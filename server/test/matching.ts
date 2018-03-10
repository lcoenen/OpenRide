
var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { Ride } from '../../shared/models/ride';
import { postDriverExample, postRiderExample } from '../../shared/mocks/ride';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

beforeEach(() => {

	return resetMock();

})

describe('matching', () => {

  it("should find the match", () => {

		return (() => {

			return chai.request(url)
				.post('/api/rides')
				.send(postRiderExample)

		})().then((res:any) => {

		 	expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.post('/api/rides')
				.send(postDriverExample)

		}).then((res: any) => {

		 	expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.get(`/api/rides/${postRiderExample}/matches`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans[0]).to.be.equal(postRiderExample);

		}).catch((err: any) => {

		 	throw err; 

		})


	})

});
