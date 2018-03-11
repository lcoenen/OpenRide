
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
	postDriverExample, 
	postRiderExample,
	postDriverLesserExample } from '../../shared/mocks/ride';


import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';
const connectedUsername: string = 'Rick';

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
				.get(`/api/rides/${postRiderExample._id}/matches`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans).to.include(`/api/rides/${ postDriverExample._id }`);

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
				.post('/api/rides')
				.send(postRiderExample)

		})().then((res:any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.post('/api/rides')
				.send(postDriverLesserExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.post('/api/rides')
				.send(postDriverExample)

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.get(`/api/rides/${postRiderExample._id}/matches`)

		}).then((res: any) => {

			let ans = JSON.parse(res.text);
			expect(ans[1]).to.be.equal(`/api/rides/${ postDriverLesserExample._id }`);

		}).catch((err: any) => {

			throw err			

		})
	
	});

	it("should accept moment string");

	it("should accept request sending", () => {

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
				.post(`/api/rides/${ postDriverExample._id }/request`)
				.send({
					from: `/api/users/${ connectedUsername }`
				})

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).catch((err:any) => {

			throw err;  

		});

	});

	it("should grab the list of requests", () => {

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
				.post(`/api/rides/${ postDriverExample._id }/request`)
				.send({
					from: `/api/users/${ connectedUsername }`
				});

		}).then((res: any) => {

			expect(res).to.have.status(201); 

		}).then(() => {

			return chai.request(url)
				.get(`/api/rides/${ postDriverExample._id }/request`);

		}).then((res:any) => {

			let ans = JSON.parse(res.text);
			expect(ans).to.include( `/api/users/${ connectedUsername }`);

		}).catch((err:any) => {

			throw err;  

		});

	});

});
