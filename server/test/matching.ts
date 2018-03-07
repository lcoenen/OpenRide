
var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { Ride } from 'shared/models/ride';

const url: string = 'localhost:3000';

const postDriverExample: Ride = {
	'_id': 'EindhovenMaastricht',
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.437935, 5.462851]
		},
		'properties': {
			'address': 'Jacobus Deckerstraat, 94, Eindhoven, NL'
		}
	},
	'destination': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.841862, 5.708596]
		},
		'properties': {
			'address': 'Kardinaal van Rossumplein, 6221, Maastricht, NL'
		}
	},
	'riding_time': 'Tomorrow at 10:32',
	'payement': 23,
	'driver': { '@id': '/api/users/Moe' },
	'riders': []
}

const postRiderExample = {
	'_id': 'EindhovenMaastrichtRequest',
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.437935, 5.462851]
		},
		'properties': {
			'address': 'Jacobus Deckerstraat, 94, Eindhoven, NL'
		}
	},
	'destination': {
		'type': 'urleature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.841862, 5.708596]
		},
		'properties': {
			'address': 'Kardinaal van Rossumplein, 6221, Maastricht, NL'
		}
	},
	'riding_time': 'Tomorrow at 10:32',
	'payement': 23,
	'riders': [{ '@id': '/api/users/Moe' }]
}

describe('rides',  () => {
	it("should get a list of rides");
	it("should get a specific ride");
	it("should add and remove riders inside ride");
	it("should delete ride when needed");

	it("should post a new ride", () => {


		return chai.request(url)
			.post('/api/rides')
			.send(postDriverExample)
			.then((res: any) => {

				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get('/api/rides/')

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				expect(ans[ans.length - 1].payement).to.equal(23);

			}).then(() => {

				return chai.request(url).get(`/api/rides/${postDriverExample._id}`).catch((err: any) => {


					throw err;

				});

			}).then((res: any) : void => {

				let ans = JSON.parse(res.text);
				expect(ans.destination.properties.address).to.be.equal(postRiderExample.destination.properties.address);
			}).catch((err: any) : void => {


				throw err;

			})

	});
	it("should post a new ride request", () => {

		return chai.request(url)
			.post('/api/rides')
			.send(postRiderExample)
			.then((res: any) => {

				expect(res).to.have.status(201);

			}).then(() => {

				return chai.request(url).get('/api/rides/')

			}).then((res: any) => {

				let ans = JSON.parse(res.text);
				expect(ans[ans.length - 1].payement).to.equal(23);

			});

	});
});
