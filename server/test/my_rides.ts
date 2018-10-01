
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
import { Link } from '../../shared/models/link';

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

	return resetMock().then( () => {

		return chai.request(url)
			.put('/api/session/me')
			.send(userSignupCredentials)

	}).then((res: any) => {

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

describe.only('my-rides', () => {

	it.only('should show the ride I\'m driving', ( ) => {

		console.log('trying to PUT ride', postDriverExample._id)
		console.log('with key', LouiseKey);

		return chai.request(url)
			.put(`/api/rides/${postDriverExample._id}`)
			.send(postDriverExample)
			.set('openride-server-session', LouiseKey)
			.then((res: any) => {

				expect(res).to.have.status(201);

			})
		.then(( ) => {

			return chai.request(url)
				.get('/api/session/me/rides')
				.set('openride-server-session', LouiseKey)

		})
		.then((res:any) => {

			let myRides: any = JSON.parse(res.text)		    
			let matching = myRides.filter((ride: Ride) => 
				ride['_id'] == postDriverExample._id )

			expect(matching.length).to.be.equal(1)

		})

	})

	it('should show the ride I\'m into', ( ) => {

		// Louise is into the ride RideMock[1] 
		return chai.request(url)
			.get('/api/session/me/rides')
			.set('openride-server-session', LouiseKey)
		.then((res: any) => {

		  let myRides: any = JSON.parse(res.text)  

			let matching = myRides.filter((ride: Ride) => 
				ride['_id'] == RidesMock[1]._id )

			expect(matching.length).to.be.equal(1)

		})

	})

	it('should show the request ride', ( ) => {

		return chai.request(url)
			.put(`/api/rides/${postRiderExample._id}`)
			.send(postRiderExample)
			.set('openride-server-session', LouiseKey)
			.then((res: any) => {

				expect(res).to.have.status(201);

			})
		.then(( ) => {

			return chai.request(url)
				.get('/api/session/me/rides')
				.set('openride-server-session', LouiseKey)

		})
		.then((res:any) => {

			let myRides: any = JSON.parse(res.text)		    
			let matching = myRides.filter((ride: Ride) => 
				ride['_id'] ==  postRiderExample._id) 

			expect(matching.length).to.be.equal(1)

		})

	})

});
