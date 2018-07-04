
var chai = require('chai'),
	chaiHttp = require('chai-http'),
	chaiAsPromised = require("chai-as-promised");

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiAsPromised);
chai.use(chaiHttp);

import { Promise } from 'es6-promise';

import { expect } from 'chai' ;
import 'mocha';

import { Ride } from '../../shared/models/ride';
import { Credentials, Signature } from '../../shared/models/user';
import { Link } from '../../shared/models/link';

import { 
	Prospect, 
	isProspect, 
	ProspectType } from '../../shared/models/prospect';

import { 
	RidesMock,
	postDriverExample, 
	postRiderExample,
	postDriverLesserExample } from '../../shared/mocks/ride';

import { userSignupCredentials, 
	UsersMock, 
	PB, Louise, Rick} from '../../shared/mocks/user';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';
const connectedUsername: string = 'princess77';

let PBKey: string = '';
let LouiseKey: string = '';
let RickKey: string = '';

/*
 *
 * Reset the mock in database
 *
 */
beforeEach(() => {

	return resetMock();

})

describe('prospects', () => {

	/*
	 *
	 * Create three session keys for the tests
	 *
	 */
	before(( ) => {

		let connect = (credentials: Credentials) => {

			return chai.request(url)
				.put('/api/session/me')
				.send(credentials)
				.then((res: any) => {

					return <Signature>res.headers['openride-server-session'];  

				})

		}

		/*
		 * THERE'S A PROBLEM HERE
		 *
		 * WHEN I LOOK AT THE LOG, PB IS CONNECTED 2 TIMES AND NO RICK
		 *
		 */

		return Promise.all([
			connect(userSignupCredentials).then((key: Signature) => {

				PBKey = key;

			}),
			connect({
				login: Louise.name,
				password: Louise.password
			}).then((key: Signature) => {

				LouiseKey = key;

			}),
			connect({
				login: Rick.name,
				password: Rick.password
			}).then((key: Signature) => {

				RickKey = key;

			})

		])

	})





	it('should allow to send an invite', ( ) => {

		return (() => {

			/*
			 *
			 * Post the rider's request
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Post the driver proposition
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Send the invite
			 *
			 */
			return chai.request(url)
				.post(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', LouiseKey)
				.send({
					'with': {'@id': `/api/rides/${ postDriverExample._id }`}	
				})

		}).then((res: any) => {

			expect(res).to.have.status(201);

		}).then(() => {

			/*
			 *
			 * Check that the invite is there
			 *
			 */
			return chai.request(url) 
				.get(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', PBKey)

		}).then((res:any) => {

			let prospects: Prospect[] = res.body;

			for(let prospect of prospects) {

				expect(isProspect(prospect)).to.be.equal(true)

			}	

			expect(prospects[0].ride['@id']).to.be.equal(`/api/rides/${ postRiderExample._id }`)
			expect(prospects[0].with['@id']).to.be.equal(`/api/rides/${ postDriverExample._id }`)
			expect(prospects[0].type).to.be.equal(ProspectType.INVITE)

			return prospects;

		}).then((riderProspects: Prospect[]) => {

			/*
			 *
			 * Check that the prospect also appear on the driver side 
			 *
			 */
			return chai.request(url) 
				.get(`/api/rides/${ postDriverExample._id }/prospects`)
				.set('openride-server-session', LouiseKey)
				.then((res: any) => {

					return {res, riderProspects}; 

				})

		}).then((data:any) => {

			let { res, riderProspects } = data 

			let prospects: Prospect[] = res.body;

			console.log(`prospect`)

			expect(prospects.length).to.be.equal(1)
			expect(prospects[0]).to.be.deep.equal(riderProspects[0])

		}).then((res:any) => {

			/*
			 *
			 * Try to make the user join the ride
			 * Since PB have been invited by Louise, it 
			 * should not be an issue
			 *
			 */
			return chai.request(url)
				.patch(`/api/rides/${ postDriverExample._id	}`)
				.set('openride-server-session', PBKey)
				.send({'join': PB._id})
				.then((res: any) => {
					expect(res).to.have.status(204)

					/* 
					 *
					 * Getting the ride 
					 *
					 */

					return chai.request(url)
						.get(`/api/rides/${ postDriverExample._id }`)
						.set('openride-server-session', LouiseKey)

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

						return link['@id'] == `/api/users/${ PB._id }`;

					})

					expect(riders_ids_matching.length).to.be.equal(1)

				})

		})

	});

	it('should allow to send a request', ( ) => {

		/*
		 *
		 * Post the rider's request
		 *
		 */
		return chai.request(url)
			.put(`/api/rides/${postRiderExample._id}`)
			.set('openride-server-session', PBKey)
			.send(postRiderExample)
			.then((res:any) => {

				expect(res).to.have.status(201); 

			}).then(() => {

				/*
				 *
				 * Post the driver proposition
				 *
				 */
				return chai.request(url)
					.put(`/api/rides/${postDriverExample._id}`)
					.set('openride-server-session', LouiseKey)
					.send(postDriverExample)

			}).then((res: any) => {

				expect(res).to.have.status(201); 

			}).then(() => {

				/*
				 *
				 * Send the request to join (the prospect)
				 *
				 */
				return chai.request(url)
					.post(`/api/rides/${ postDriverExample._id }/prospects`)
					.set('openride-server-session', PBKey)
					.send({
						'with': {'@id': `/api/rides/${ postRiderExample._id }`}	
					});

			}).then((res: any) => {

				expect(res).to.have.status(201);

			}).then(() => {

				/*
				 *
				 * Check that the request prospect is there
				 * Louise should see it since it's her ride
				 *
				 */
				return chai.request(url) 
					.get(`/api/rides/${ postDriverExample._id }/prospects`)
					.set('openride-server-session', LouiseKey);

			}).then((res:any) => {

				let prospects: Prospect[] = res.body;

				for(let prospect of prospects) {

					expect(isProspect(prospect)).to.be.equal(true)
				}	

				expect(prospects[0].ride['@id']).to.be.equal(`/api/rides/${ postDriverExample._id }`)
				expect(prospects[0].with['@id']).to.be.equal(`/api/rides/${ postRiderExample._id }`)
				expect(prospects[0].type).to.be.equal(ProspectType.APPLY)

			})

	});

	it('should only allow the driver of a ride to send invite', ( ) => {

		/*
		 *
		 * Post the rider's request
		 *
		 */
		return (() => {

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Post the driver proposition
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Send the invite (the prospect)
			 * It should fail with another Key
			 *
			 */
			return expect(chai.request(url)
				.post(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', RickKey)
				.send({
					'with': {'@id': `/api/rides/${ postDriverExample._id }`}	
				})).to.be.eventually.rejectedWith('Unauthorized')

		}).then(() => {

			/*
			 *
			 * Send the invite 
			 * It should fail with the key of the driver (since only other
			 * people can request or invite to a ride). 
			 *
			 */
			return expect(chai.request(url)
				.post(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', PBKey)
				.send({
					'with': {'@id': `/api/rides/${ postDriverExample._id }`}	
				})).to.be.eventually.rejectedWith('Unauthorized')

		})

	});

	it('should only allow the requester to send request', ( ) => {


		/*
		 *
		 * Post the rider's request
		 *
		 */
		return (() => {

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Post the driver proposition
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Send the request to join (the prospect)
			 * It should fail with another Key
			 *
			 */
			return expect(chai.request(url)
				.post(`/api/rides/${ postDriverExample._id }/prospects`)
				.set('openride-server-session', RickKey)
				.send({
					'with': {'@id': `/api/rides/${ postRiderExample._id }`}	
				})).to.be.eventually.rejectedWith('Unauthorized')

		}).then( () => {

			/*
			 *
			 * Send the request 
			 * It should fail with the key of the rider
			 *  
			 */
			return expect(chai.request(url)
				.post(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', PBKey)
				.send({
					'with': {'@id': `/api/rides/${ postDriverExample._id }`}	
				})).to.be.eventually.rejectedWith('Unauthorized')

		})

	});


	it.only('should only allow an user to join a ride if there is a prospect', ( ) => {

		/*
		 *
		 * Post the rider's request
		 *
		 */
		return (() => {

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Post the driver proposition
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(( ) => {

			/*
			 *
			 * PB is trying to join the ride.
			 *
			 * It should fail since there's no request nor invite
			 *
			 */

			return expect(chai.request(url)
				.patch(`/api/rides/${ postDriverExample._id }`)
				.set('openride-server-session', PBKey)
				.send({'join': PB._id }))
				.to.be.eventually.rejectedWith('Unauthorized')

		})

	})

	it('should go through the complete workflow', ( ) => {

		/*
		 *
		 * Post the rider's request
		 *
		 */
		return (() => {

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			/*
			 *
			 * Post the driver proposition
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(( ) => {

			/*
			 *
			 * The driver (PB) want to recover the matches 
			 * (i.e. the ride she could be interested in)
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${postDriverExample._id}/matches`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans).to.include( {'@id' : `/api/rides/${ postRiderExample._id }`});

		}).then(( ) => {

			/*
			 *
			 * The driver is interested in the rider request
			 * (Louise want to go to the same place at the same time)
			 *
			 * The driver will post an invite
			 *
			 */
			return chai.request(url)
				.post(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', LouiseKey)
				.send({
					'with': {'@id': `/api/rides/${ postDriverExample._id }`}	
				})

		}).then(( ) => {

			/*
			 *
			 * The rider (PB) will have a look on his ride prospects
			 *
			 * She should see Louise invite on her ride prospect
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${ postRiderExample._id }/prospects`)
				.set('openride-server-session', PBKey)		    

		}).then((res: any) => {

			let prospects: Prospect[] = res.body;

			for(let prospect of prospects) {

				expect(isProspect(prospect)).to.be.equal(true)
			}	

			expect(prospects[0].ride['@id']).to.be.equal(`/api/rides/${ postRiderExample._id }`)
			expect(prospects[0].with['@id']).to.be.equal(`/api/rides/${ postDriverExample._id }`)
			expect(prospects[0].type).to.be.equal(ProspectType.INVITE)

		}).then(( ) => {

			/*
			 *
			 * The rider will accept the invite and join the ride
			 *
			 */
			return chai.request(url)
				.patch(`/api/rides/${ postDriverExample._id }`)
				.set('openride-server-session', PBKey)
				.send({'join': PB._id })

		}).then((res: any) => {

			expect(res).to.have.status(204);   

		}).then((res: any) => {

			/*
			 *
			 * Checking that the user is in the ride 
			 *
			 */
			let riders: Link[] = res.body.riders;
			expect(Array.isArray(riders)).to.be.equal(true)

			let riders_ids_matching: string[] = res.body.riders.filter((link: Link) => {

				return link['@id'] == `/api/users/${ PB._id }`;

			})

			expect(riders_ids_matching.length).to.be.equal(1)

		})

	})

});
