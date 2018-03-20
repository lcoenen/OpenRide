import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ride, hashRide } from 'shared/models/ride'
import { RidesMock } from 'shared/mocks/ride';

import { settings } from '../../config/config';

import 'rxjs/add/operator/toPromise';

/*
	Generated class for the RidersProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
 */
@Injectable()
export class RidersProvider {

	constructor(public httpClient: HttpClient) {
		console.log('Hello RidersProvider Provider');
	}

	/*
		Used when a driver is offering a ride, to invite riders
	 */
	invitable_riders(): Ride[] {

		console.log('Trying the API call');
		/*
		this.httpClient.get('localhost:3000/api/ping').subscribe( data => {

			console.log('Answer from the API', data);

		}); 
		 */
		console.log('Fetching invitable riders');
		return RidesMock;

	}

	/*
		Used when a rider request a ride, to show him matches
	 */
	request_find_ride(): Ride[] {

		console.log('Fetching invitable riders');
		return RidesMock;

	}

	/*
		Offer a ride
	 */
	offer_ride(ride: Ride) {

		if(!ride._id) ride._id = hashRide(ride);
		console.log(`Provider: recieved a ride`)
		console.log(ride)
		console.log(`Trying to contact ${  settings.apiEndpoint + `/api/rides`}`)
		return this.httpClient
			.post(
				settings.apiEndpoint + `/api/rides`,
				ride)
			.toPromise()
			.catch((msg) => {

				console.error(`RiderProvider: offerride() tried to contact the server but recieved an error`)
				console.error(`Status: ${ msg.status } ${ msg.statusText }`)
				console.log(msg)

				throw Error(msg);

			})

	}

}
