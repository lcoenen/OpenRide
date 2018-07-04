
var chai = require('chai'),
	chaiHttp = require('chai-http'),
	chaiAsPromised = require("chai-as-promised");

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiAsPromised);
chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { Ride } from '../../shared/models/ride';
import { 
	RidesMock,
	postDriverExample, 
	postRiderExample,
	postDriverLesserExample } from '../../shared/mocks/ride';
import { userSignupCredentials, 
	UsersMock, 
	PB, Louise } from '../../shared/mocks/user';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';
const connectedUsername: string = 'princess77';

let PBKey: string = '';
let LouiseKey: string = '';

beforeEach(() => {

	return resetMock();

})

describe('matching', () => {

	before(( ) => {

		return (() => {

			return chai.request(url)
				.put('/api/session/me')
				.send(userSignupCredentials)

		})().then((res: any) => {

			PBKey = res.headers['openride-server-session']

		}).then(() => {

			return chai.request(url)
				.put('/api/session/me')
				.send({
					login: Louise.name,
					password: Louise.password
				})

		}).then((res: any) => {

			LouiseKey = res.headers['openride-server-session']

		})


	})

	it("should find the match", () => {

		return (() => {


			/* 
			 *
			 * Post these two examples 
			 *
			 */

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {


			/*
			 *
			 * Recover the matches of the request and check if the proposition is there
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${postRiderExample._id}/matches`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans).to.include( {'@id' : `/api/rides/${ postDriverExample._id }`});

		}).catch((err: any) => {

			throw err			

		})

	})

	it("should answer a 404 error if the ride doesn't exist", () => {

		expect(chai.request(url).get('/api/rides/unknownride'))
			.to.eventually.be.rejected;

		expect(chai.request(url).get('/api/rides/unknownride'))
			.to.eventually.be.rejectedWith(Error, 'Not Found');

	});

	it("should sort the concurrents rides based on their proximity", () => {

		return (() => {

			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.send(postRiderExample)
				.set('openride-server-session', PBKey)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.put(`/api/rides/${postDriverLesserExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverLesserExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.get(`/api/rides/${postRiderExample._id}/matches`)
				.set('openride-server-session', PBKey)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans[1]['@id']).to.be.equal(`/api/rides/${ postDriverLesserExample._id }`);

		}).catch((err: any) => {

			throw err			

		})

	});

	it("should not return rides of the same types (offer or request)", () => {

		return (() => {

			/*
			 *
			 * Add the three examples
			 *
			 * These three examples are contained in shared/mocks/rides.ts
			 *
			 */
			return chai.request(url)
				.put(`/api/rides/${postRiderExample._id}`)
				.set('openride-server-session', PBKey)
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.put(`/api/rides/${postDriverLesserExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverLesserExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.put(`/api/rides/${postDriverExample._id}`)
				.set('openride-server-session', LouiseKey)
				.send(postDriverExample)

		}).then((res: any) => {

			/*
			 *
			 * Recover the matches
			 *
			 */
			return chai.request(url)
				.get(`/api/rides/${ postDriverLesserExample._id }/matches`)
				.set('openride-server-session', LouiseKey)



		}).then((res: any) => {

			/*
			 *
			 * It should contain the driver proposition and NOT the other ride request
			 *
			 */
			let ans = JSON.parse(res.text);
			expect(ans).to.lengthOf(1);
			expect(ans[0]['@id']).to.be.equal(`/api/rides/${ postRiderExample._id }`);

		})

	});

	// it("should accept request sending", () => {

	// 	return (() => {

	// 		/*
	// 		 *
	// 		 * Post the rider's request
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.put(`/api/rides/${postRiderExample._id}`)
	// 			.set('openride-server-session', PBKey)
	// 			.send(postRiderExample)

	// 	})().then((res:any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {
	// 		/*
	// 		 *
	// 		 * Post the driver proposition
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.put(`/api/rides/${postDriverExample._id}`)
	// 			.set('openride-server-session', LouiseKey)
	// 			.send(postDriverExample)

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {

	// 		/*
	// 		 *
	// 		 * Post the rider's request to the driver proposition
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.post(`/api/rides/${ postDriverExample._id }/requests`)
	// 			.set('openride-server-session', PBKey)
	// 			.send()

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).catch((err:any) => {

	// 		throw err;  

	// 	});

	// });

	// it("should grab the list of requests", () => {

	// 	return (() => {

	// 		/*
	// 		 *
	// 		 * Posting the example rider
	// 		 *
	// 		 */

	// 		return chai.request(url)
	// 			.put(`/api/rides/${postRiderExample._id}`)
	// 			.set('openride-server-session', PBKey	)
	// 			.send(postRiderExample)

	// 	})().then((res:any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {

	// 		/*
	// 		 *
	// 		 * Posting the example driver ride
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.put(`/api/rides/${postDriverExample._id}`)
	// 			.set('openride-server-session', LouiseKey)
	// 			.send(postDriverExample)

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {


	// 		/*
	// 		 *
	// 		 * Make the rider post a request to the driver ride
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.post(`/api/rides/${ postDriverExample._id }/requests`)
	// 			.set('openride-server-session', PBKey)
	// 			.send();

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {


	// 		/*
	// 		 *
	// 		 * Check that the request have been recorded
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.get(`/api/rides/${ postDriverExample._id }/requests`);

	// 	}).then((res:any) => {

	// 		let ans = JSON.parse(res.text);
	// 		expect(ans[0].from['@id']).to.equal(`/api/users/${ connectedUsername }`);
	// 		expect(ans[0].to['@id']).to.equal(`/api/rides/${ postDriverExample._id }`);

	// 	}).catch((err:any) => {	

	// 		throw err;  

	// 	});

	// });

	// // it("should not accept a request for a ride with no driver", ( ) => {

	// // 	return (() => {

	// // 		/*
	// // 		 *
	// // 		 * Posting the example rider
	// // 		 *
	// // 		 */

	// // 		return chai.request(url)
	// // 			.put(`/api/rides/${postRiderExample._id}`)
	// // 			.set('openride-server-session', key)
	// // 			.send(postRiderExample)

	// // 	})().then((res:any) => {

	// // 		expect(res).to.have.status(201); 

	// // 	}).then(() => {

	// // 		/*
	// // 		 *
	// // 		 * Posting the example driver ride
	// // 		 *
	// // 		 */
	// // 		return chai.request(url)
	// // 			.put(`/api/rides/${postDriverExample._id}`)
	// // 			.set('openride-server-session', key)
	// // 			.send(postDriverExample)

	// // 	}).then((res: any) => {

	// // 		expect(res).to.have.status(201); 

	// // 	}).then(() => {

	// // 		/*
	// // 		 *
	// // 		 * Make the rider post a request to the RIDER ride request
	// // 		 *
	// // 		 * It should fail since there's no point in joining a ride without any drivers
	// // 		 *
	// // 		 */
	// // 		expect(chai.request(url)
	// // 			.post(`/api/rides/${ postRiderExample._id }/requests`)
	// // 			.set('openride-server-session', key)
	// // 			.send({
	// // 				from: {'@id': `/api/users/${ connectedUsername }`}
	// // 			}))
	// // 		.to.eventually.be.rejectedWith(Error, 'Not Found');

	// // 	});

	// // });

	// it.skip('should be allowed to join a ride only if the driver accept a request or the rider accept an invite', ( ) => {

	// 		return expect(chai.request(url)
	// 		/* Trying to make the user join the ride */
	// 			.patch(`/api/rides/${ RidesMock[4]._id }`)
	// 			.set('openride-server-session', key)
	// 			.send({'join': PB._id}))
	// 		.to.eventually.be.rejectedWith('Unauthorized')

	// })

	// it('shouldn\'t be allowed to kick somebody from a ride if you\'re not the driver (or yourself)', ( ) => {
	    
	// 		return (expect(chai.request(url)
	// 		/* Trying to make the user depart the ride */
	// 			.patch(`/api/rides/${ RidesMock[0]._id }`)
	// 			.set('openride-server-session', key)
	// 			.send({'depart': 'Rick'})))
	// 		.to.eventually.be.rejectedWith('Unauthorized')

	// })

	// it('should not be allowed to place a request for somebody else than oneself', ( ) => {

	// 		return expect(chai.request(url)
	// 			.post(`/api/rides/LiegeBruxelles/requests`)
	// 			.set('openride-server-session', key)
	// 			.send({
	// 				/* Moe is not the connected user */
	// 				from: {'@id': `/api/users/Moe`} 
	// 			}))
	// 		.to.eventually.be.rejectedWith('Unauthorized')

	// })


	// it("should accept invite sending", () => {

	// 	(() => {

	// 		/*
	// 		 *
	// 		 * Post the rider's request with the other key (Louise is the rider)
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.put(`/api/rides/${postRiderExample._id}`)
	// 			.set('openride-server-session', LouiseKey)
	// 			.send(postRiderExample)

	// 	})().then((res:any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {
	// 		/*
	// 		 *
	// 		 * Post the driver proposition (PB is the driver)
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.put(`/api/rides/${postDriverExample._id}`)
	// 			.set('openride-server-session', PBKey)
	// 			.send(postDriverExample)

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).then(() => {

	// 		/*
	// 		 *
	// 		 * Post the driver's invite to the rider 
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.post(`/api/rides/${ postRiderExample._id }/requests`)
	// 			.set('openride-server-session', LouiseKey)
	// 			.send({
	// 				to: {'@id': `/api/rides/${ postDriverExample._id }` }	
	// 			})

	// 	}).then((res: any) => {

	// 		expect(res).to.have.status(201); 

	// 	}).catch((err:any) => {

	// 		throw err;  

	// 	}).then(() => {


	// 		/*
	// 		 *
	// 		 * Check that the request have been recorded
	// 		 *
	// 		 */
	// 		return chai.request(url)
	// 			.get(`/api/rides/${ postRiderExample._id }/requests`);

	// 	}).then((res:any) => {

	// 		let ans = JSON.parse(res.text);
	// 		expect(ans[0].from['@id']).to.equal(`/api/users/${ Louise.name }`);
	// 		expect(ans[0].to['@id']).to.equal(`/api/rides/${ postDriverExample._id }`);

	// 	}).catch((err:any) => {	

	// 		throw err;  

	// 	});



	// });

});
