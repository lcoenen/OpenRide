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
import { userSignupExample, userSignupCredentials	} from '../../shared/mocks/user';

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

	it("should accept login", () => {
				  
		return (() => {
			
			return chai.request(url)
				.post('/api/users/me')
				.send(userSignupCredentials)

		})().then((ans: any) => {

			expect(ans).to.have.status(201);

		});

	});

	it("should fail with a not found if there's no such user or email", () => {

		return (() => {

			userSignupCredentials['password'] = 'fake';

			return chai.request(url)
				.post('/api/users/me')
				.send(userSignupCredentials)

		})().catch((err:any) => {

			console.log(`l. 98`)
			console.log(err)

		})

	});
	it("should fail with an unauthorise if the password is not good");
	it("should remember me once I'm connected");

	it("should should accept logout");

});
