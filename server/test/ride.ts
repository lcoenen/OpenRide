
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
import { UsersMock, userSignupCredentials, PB } from '../../shared/mocks/user';

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

		return expect(chai.request(url)
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

	it("should delete ride when needed", () => {

		return chai.request(url)
			.put(`/api/rides/${postDriverExample._id}`)
			.send(postDriverExample)
			.set('openride-server-session', key)
			.then((res: any) => {
				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get(`/api/users/${ PB._id }/rides`)

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				// ans should be a list of ride Link
				let promises : Promise<Ride>[] = ans.map((link: Link) => {

					return chai.request(url).get(link['@id'])  

				})

				return Promise.all(promises)

			}).then((answers: any[]) => {

				let rides : Ride[] = answers.map((ans: any) => {

					return ans.body  

				})

				expect(rides[rides.length - 1].payement).to.equal(postDriverExample.payement);

			}).then(() => {

				return chai.request(url).get(`/api/rides/${postDriverExample._id}`).catch((err: any) => {

					throw err;

				});

			}).then((res: any) : void => {

				let ans = JSON.parse(res.text);
				expect(ans.destination.properties.address).to.be.equal(postDriverExample.destination.properties.address);

			})

			.then(( ) => {

				return chai.request(url)
					.delete(`/api/rides/${ postDriverExample._id }`)
					.set('openride-server-session', key)
					.then((res: any) => {

						expect(res).to.have.status(204)	

					})
					.then(() => {

						return chai.request(url).get(`/api/users/${ PB._id }/rides`)

					}).then((res: any) => {

						expect(res).to.have.status(200)

						let ans = JSON.parse(res.text);
						// ans should be a list of ride Link
						let promises : Promise<Ride>[] = ans.map((link: Link) => {

							return chai.request(url).get(link['@id'])  

						})

						return Promise.all(promises)

					}).then((answers: any[]) => {

						let rides: Ride[] = answers.map((ans: any) => ans.body);

						rides = rides.filter((ride: Ride) => {

						  return ride._id == postDriverExample._id  

						})

						expect(rides.length == 0)

					});

			})

	});

	it('should not be allowed to delete a ride that is not yours')
	it('should not be allowed to post a ride on somebody else name')

	it("should post a new ride", () => {

		return chai.request(url)
			.put(`/api/rides/${postDriverExample._id}`)
			.send(postDriverExample)
			.set('openride-server-session', key)
			.then((res: any) => {
				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get(`/api/users/${ PB._id }/rides`)

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				// ans should be a list of ride Link
				let promises : Promise<Ride>[] = ans.map((link: Link) => {

					return chai.request(url).get(link['@id'])  

				})

				return Promise.all(promises)

			}).then((answers: any[]) => {

				let rides : Ride[] = answers.map((ans: any) => {

					return ans.body  

				})

				expect(rides[rides.length - 1].payement).to.equal(postDriverExample.payement);

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

			})
			.then(( ) => {

				return chai.request(url).get(`/api/users/${ PB._id }/rides`)

			}).then((res: any) => {

				let rides: Link[] = res.body;

				// ans should be a list of ride Link
				let promises : Promise<Ride>[] = rides.map((link: Link) => {

					return chai.request(url).get(link['@id'])  

				})

				return Promise.all(promises)

			}).then((answers: any[]) => {

				let rides : Ride[] = answers.map((ans: any) => {

					return ans.body  

				})

				expect(rides[rides.length - 1].payement).to.equal(postRiderExample.payement);

			});
	})


});
