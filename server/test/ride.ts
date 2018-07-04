
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
import { postDriverExample, postRiderExample } from '../../shared/mocks/ride';
import { Link } from '../../shared/models/link';

import { RidesMock } from '../../shared/mocks/ride';
import { UsersMock, userSignupCredentials } from '../../shared/mocks/user';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

let key: string = '';

beforeEach(() => {

	return resetMock();

})

describe('rides',  () => {

	before(( ) => {

		return (() => {

			return chai.request(url)
				.put('/api/session/me')
				.send(userSignupCredentials)

		})().then((res: any) => {

			key = res.headers['openride-server-session']

		})

	})

	it("should NOT get a list of rides", () => {

		expect(chai.request(url)
			.get('/api/rides/')
			.set('openride-server-session', key)
			).to.be.rejectedWith('Unauthorized')

	});

	it("should get a specific ride", () => {

		return chai.request(url)
			.get(`/api/rides/${ RidesMock[3]._id }`)
			.set('openride-server-session', key)
			.then((res : any) => {
				let ride: Ride = res.body;
				expect(ride._id).to.be.equal(RidesMock[3]._id) 
				expect(isRide(ride)).to.be.equal(true)

			})

	});

	it("should add and remove riders inside ride", () => {

		return chai.request(url)
		/* 
		 *
		 * Trying to join the ride.
		 *
		 * PB is the driver in ride 2 (MaastrichtBruxelles)
		 *
		 */
			.patch(`/api/rides/${ RidesMock[2]._id }`)
			.set('openride-server-session', key)
			.send({'join': UsersMock[3]._id})
			.then((res: any) => {
				expect(res).to.have.status(200)

				/* 
				 *
				 * Getting the ride 
				 *
				 */
				return chai.request(url)
					.get(`/api/rides/${ RidesMock[2]._id }`)

			})
			.then((res: any) => {

				/*
				 *
				 * Checking that the user is in the ride 
				 *
				 */

				let riders: Link[] = res.body.riders;
				expect(Array.isArray(riders)).to.be.equal(true)


				let riders_ids_matching: string[] = res.body.riders.filter((link: Link) => {

					return link['@id'] == `/api/users/${ UsersMock[3]._id }`;

				})

				expect(riders_ids_matching.length).to.be.equal(1)

			})
			.then(() => {

				return chai.request(url)
				/*
				 *
				 * Trying to make the user depart from the ride 
				 *
				 */
					.patch(`/api/rides/${ RidesMock[1]._id }`)
					.set('openride-server-session', key)
					.send({'depart': 'princess77'})

			})
			.then((res: any) => {

				expect(res).to.have.status(200)

				return chai.request(url)
					.get(`/api/rides/${ RidesMock[1]._id }`)

			})
			.then((res: any) => {

				/*
				 *
				 * Checking that the user is NOT in the ride anymore 
				 *
				 */

				let riders: Link[] = res.body.riders;
				expect(Array.isArray(riders)).to.be.equal(true)

				let riders_ids_matching: string[] = res.body.riders.filter((link: Link) => {

					return link['@id'] == `/api/users/princess77`;

				})

				expect(riders_ids_matching.length).to.be.equal(0)

			})


	});

	it("should delete ride when needed", () => {

		return chai.request(url)
			.delete(`/api/rides/${ RidesMock[3]._id }`)
			.set('openride-server-session', key)
			.then((res: any) => {

				expect(res).to.have.status(204)	

			})
			.then(() => {

				return chai.request(url)
					.get('/api/rides')
					.set('openride-server-session', key)
					.then((res: any) => {

						expect(res).to.have.status(200)
						expect(res.body.length).to.be.equal(RidesMock.length - 1)	

					})

			})

	});

	it("should post a new ride", () => {


		return chai.request(url)
			.put(`/api/rides/${postDriverExample._id}`)
			.send(postDriverExample)
			.set('openride-server-session', key)
			.then((res: any) => {
				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get('/api/rides/')

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				expect(ans[ans.length - 1].payement).to.equal(postDriverExample.payement);

			}).then(() => {

				return chai.request(url).get(`/api/rides/${postDriverExample._id}`).catch((err: any) => {

					throw err;

				});

			}).then((res: any) : void => {

				let ans = JSON.parse(res.text);
				expect(ans.destination.properties.address).to.be.equal(postDriverExample.destination.properties.address);
			}).catch((err: any) : void => {

				throw err;

			});

	});

	it("should post a new ride request", () => {

		return chai.request(url)
			.put(`/api/rides/${postRiderExample._id}`)
			.send(postRiderExample)
			.set('openride-server-session', key)
			.then((res: any) => {

				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get('/api/rides/')

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				expect(ans[ans.length - 1].payement).to.equal(postRiderExample.payement);

			});

	});

});
