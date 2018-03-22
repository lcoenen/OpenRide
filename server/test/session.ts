var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { User } from '../../shared/models/user';
import { userSignupExample } from '../../shared/mocks/user';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

beforeEach(() => {

	return resetMock();

})

describe('session',  () => {

	it("should accept signup", () => {

		return (() => {
			
			return chai.request(url)
				.post('/api/users')
				.send(userSignupExample)

		})().then((ans: any) => {

			expect(ans).to.have.status(201);

		}).then(() => {

			return chai.request(url)
				.get(`/api/users/${ userSignupExample._id }`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans).to.be.deep.equal(userSignupExample);

		})

	});

	it("should not accept signup when one item is missing", () => {

		return (() => {

			userSignupExample.email = undefined;

			expect(chai.request(url)
				.post('/api/users')
				.send(userSignupExample))
				.to.eventually.be.rejected

		})()

	});

	it("should accept login");
	it("should should accept logout");

});
