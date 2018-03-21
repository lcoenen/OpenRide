import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ride, hashRide } from 'shared/models/ride'
import { Link } from 'shared/models/link'
import { RidesMock } from 'shared/mocks/ride';

import { settings } from '../../config/config';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

/*
	Generated class for the RidersProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
 */
@Injectable()
export class RidersProvider {

	public currentRideId: string;

	constructor(public httpClient: HttpClient) {
		console.log('Hello RidersProvider Provider');
	}

	/*
		Used when a driver is offering a ride, to invite riders
	 */
	invitable_riders(): Observable<Ride[]> {

		// A stream that emit one Link[] 
		return this.httpClient.get(`${ settings.apiEndpoint }/api/rides/${ this.currentRideId }/matches`)
			.mergeMap((links: Link[]) => {
				// Return a stream that emit each Link 
				return Observable.from(links) 
					.mergeMap((link: Link) : Observable<Ride> => {
						// Return a stream that emit each resolved Ride
						return this.httpClient.get(`${ settings.apiEndpoint }${ link['@id'] }`);
					})
					.mergeMap((ride: Ride): Observable<Ride> => {
						if(ride.driver) {
							return this.httpClient
								.get(`${ settings.apiEndpoint }${ ride.driver['@id'] }`)
								.map( (user: User) => {
								  ride.driver = user;  
									return ride;
								})
							}
						else return Observable.of(ride);

					})
			})
			.toArray()

		// 		return this.httpClient.get(`${ settings.apiEndpoint }/api/rides/${ this.currentRideId }/matches`)
		// 			.mergeMap((links: Link[]) => {

		// 			 	return Observable.from(links) 

		// 			})
		// 			.mergeMap((link: Link) => {

		// 				console.log(`Recieved from invitable_riders()`)

		// 				return this.httpClient.get(`${ settings.apiEndpoint }${ link['@id'] }`);

		// 			})
		// 			.subscribe((data) => {

		// 				console.log(`line 50`)

		// 			  console.log(data)  

		// 			})

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
		this.currentRideId = ride._id;
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
