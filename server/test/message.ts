
var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { Ride, isRide } from '../../shared/models/ride';
import { Link } from '../../shared/models/link';
import { Message, isMessage } from '../../shared/models/message';

import { RidesMock } from '../../shared/mocks/ride';
import { postDriverExample, postRiderExample } from '../../shared/mocks/ride';
import { UsersMock, userSignupCredentials } from '../../shared/mocks/user';
import { messagePostExample } from '../../shared/mocks/message';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

let key: string = '';

describe('messages',  () => {

	/*
	 *
	 * Logging in before launching the tests
	 *
	 */
	before(( ) => {

		return resetMock().then( () => {

			return chai.request(url)
				.put('/api/session/me')
				.send(userSignupCredentials)

		}).then((res: any) => {

			key = res.headers['openride-server-session']

		})

	})

	// it("should get a list of rides", () => {

	// 	return chai.request(url)
	// 		.get('/api/rides/')
	// 		.set('openride-server-session', key)
	// 		.then((res: any) => {

	// 			let arrayOfRide: Ride[] = res.body;
	// 			expect(Array.isArray(arrayOfRide)).to.be.equal(true)

	// 			for(let ride of arrayOfRide) expect(isRide(ride)).to.be.equal(true)

	// 		})

	// });

	it("should get the list of message", ( ) => {


		/*
		 *
		 * Trying to get the message list
		 *
		 */
		return chai.request(url)
			.get(`/api/rides/${ RidesMock[2]._id }/messages`)
			.set('openride-server-session', key)
			.then((res: any) => {

				let messages: Message[] = res.body;

				for(let message of messages) {

					expect(isMessage(message)).to.be.equal(true)
				
				} 

				expect(messages.length).to.be.equal(2)

			})

	})

	it("should get an error if the user isn't in the ride", () => {

		/*
		 *
		 * Trying to post a message from PB in a ride she's not in
		 *
		 */
		return expect(chai.request(url)
			.get(`/api/rides/${ RidesMock[0]._id }/messages`)
			.set('openride-server-session', key))	
			.to.eventually.be.rejectedWith(Error, 'Unauthorized');

	})

	it("should be able to post a message", () => {

		return (( ) => {

			/*
			 *
			 * Tring to post a message from PB on the ride she's in
			 *
			 */
			return chai.request(url)
				.post(`/api/rides/${ RidesMock[2]._id }/messages`)
				.set('openride-server-session', key)
				.send({message: messagePostExample})
				.then((res: any) => {

					expect(res).to.have.status(201)  

				})

		})()
		.then(( ) => {

			/*
			 *
			 * Checking the message list
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${ RidesMock[2]._id }/messages`)
				.set('openride-server-session', key)
				.then((res: any) => {

					expect(res).to.have.status(200);

					let messages: Message[] = res.body;

					for(let message of messages) {

						expect(isMessage(message)).to.be.equal(true)
					
					} 

					/*
					 *
					 * There should be one more message than before
					 *
					 */
					expect(messages.length).to.be.equal(3)

				})

		})

	})

	it.skip("should be able to delete a message", ( ) => {

		return (( ) => {

			/*
			 *
			 * Tring to post a message from PB on the ride she's in
			 *
			 */
			return chai.request(url)
				.post(`/api/rides/${ RidesMock[2]._id }/messages`)
				.set('openride-session-session', key)
				.send(messagePostExample)
				.then((res: any) => {

					expect(res).to.have.status(201)  

				})

		})()
		.then(( ) => {

			/*
			 *
			 * Checking the message list
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${ RidesMock[2]._id }/messages`)
				.set('openride-server-session', key)
				.then((res: any) => {

					expect(res).to.have.status(200);

					let messages: Message[] = res.body;

					for(let message of messages) {

						expect(isMessage(message)).to.be.equal(true)
					
					} 

					/*
					 *
					 * There should be one more message than before
					 *
					 */
					expect(messages.length).to.be.equal(3)

				})

		}).then(( ) => {

			// return chai.request(url)
				// .del(`/apirides/${ RidesMock[2]._id }/messages/${ messageid }`)

		})

	})

	it('should be able to edit a message')

});
