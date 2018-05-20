var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { User, sanitize } from '../../shared/models/user';
import { userSignupExample, userSignupCredentials	} from '../../shared/mocks/user';

import { logger } from '../app/services/logger';
import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

describe('session',  () => {

	beforeEach(function  () {

		this.timeout(0);
		return resetMock();

	})

	it("should accept signup", () => {

		return (() => {

			return chai.request(url)
				.put(`/api/users/${ userSignupExample._id}`)
				.send({user: userSignupExample})

		})().then((ans: any) => {

			expect(ans).to.have.status(201);

		}).then(() => {

			return chai.request(url)
				.get(`/api/users/${ userSignupExample._id }`)

		}).then((res: any) => {

			logger.trace(`TRACE: recieved the answer. `)
			logger.trace(res)

			let ans = JSON.parse(res.text);
			expect(ans).to.be.deep.equal(sanitize(userSignupExample));

		}).catch((err: Error) => {

			logger.error(`ERROR: Couldn't get the user mordicai`)
			logger.error(err)
			throw err;

		})

	});

	it("should not accept signup when one item is missing", () => {

		return (() => {


			/*
			 *
			 * Trying to sign up an incomplete user
			 *
			 */
			let _credentials:any = {... userSignupExample};
			delete _credentials.email;

			return expect(chai.request(url)
				.put(`/api/users/${userSignupExample._id}`)

				.send({user:_credentials}))
				.to.eventually.be.rejectedWith('Bad Request')

		})().then(() => {

			/*
			 *
			 * Trying to sign up an user without using the {user: XXX} property
			 *
			 */
			let _credentials:any = {... userSignupExample};

			return expect(chai.request(url)
				.put(`/api/users/${userSignupExample._id}`)

				.send(_credentials))
				.to.eventually.be.rejectedWith('Bad Request')


		})

	});

	it("should accept login", () => {

		return chai.request(url)
			.put('/api/session/me')
			.send(userSignupCredentials)
			.then((ans: any) => {

				expect(ans).to.have.status(201);

			})
			.catch((err: Error) => {

				throw err;

			});

	});

	it("should fail with a not found if there's no such user or email", () => {

		let _credentials:any = {...userSignupCredentials};
		_credentials['login'] = 'fake';

		return chai.request(url)
			.put('/api/session/me')
			.send(userSignupCredentials)
			.catch((err: any) => {

				expect(err).to.have.status(404)

			})

	});

	it("should fail with an unauthorise if the password is not good", () => {

		let _credentials:any = {... userSignupCredentials};
		_credentials['password'] = 'fake';

		return chai.request(url)
			.put('/api/session/me')
			.send(userSignupCredentials)
			.catch((err: any) => {

				expect(err).to.have.status(401)

			})

	});

	it("should remember me once I'm connected", () => {

		return (() => {

			return chai.request(url)
				.put('/api/session/me')
				.send(userSignupCredentials)

		})().then((res: any) => {

			expect(res).to.have.header('openride-server-session')
			logger.trace(`The test recieved the key ${ res.headers['openride-server-session'] }`)
			return chai.request(url)
				.get('/api/session/me')	
				.set('openride-server-session', res.headers['openride-server-session'])

		}).then((res: any) => {

			let user: User = JSON.parse(res.text);
			expect(user._id).to.be.equal(userSignupCredentials.login);
			expect(user.password).not.to.exist;

		}).catch((err: any) => {

			console.log(err)
			throw err;

		})

	});

	it("should log me in when I sign up", () => {

		return (() => {
			
			return chai.request(url)
				.put(`/api/users/${ userSignupExample._id}`)
				.send({user: userSignupExample})

		})().then((res: any) => {

			expect(res).to.have.header('openride-server-session')
			return chai.request(url)
				.get('/api/session/me')	
				.set('openride-server-session', res.headers['openride-server-session'])

		}).then((res: any) => {

			let user: User = JSON.parse(res.text);
			expect(user._id).to.be.equal(userSignupExample._id);
			expect(user.password).not.to.exist;

		})
	
	})

	it("should send a cookie when rememberme is true");

});
