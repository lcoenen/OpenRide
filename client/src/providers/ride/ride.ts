import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
;
import { settings } from '../../config/config'

import { Ride, hashRide, RideType } from 'shared/models/ride'
import { User } from 'shared/models/user'
import { Link } from 'shared/models/link'
import { RidesMock } from 'shared/mocks/ride';

/*
	Generated class for the RidersProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
 */
@Injectable()
export class RideProvider {

	private _currentRide: Ride;

	constructor(public httpClient: HttpClient) {
		console.log('Hello RidersProvider Provider');
	}

	/*
	 *
	 * Used to  waits until an observer subscribes to it before it begins to emit items, and so such an ob waits until an observer subscribes to it before it begins to emit items, and so such an obshow which ride is currently selected
	 *
	 */
	get currentRide() {

		return this._currentRide;

	}

	/*
	 *
	 * Used when a driver is offering a ride, to invite riders
	 * 
	 * It makes the link with the offer-invite and uses the entrypoint /api/rides/:id/matches
	 *
	 */
	invitable_ride(): Promise<Ride[]> {

		return this.httpClient.get<Link[]>(
			`${ settings.apiEndpoint }/api/rides/BruxellesLiege/matches`)
		.mergeMap((rides: Link[]) => {

			console.log(`I recieved a list of ride`)
			console.log(rides)

			// Create an observable that emit each value in the array
			return Observable.from(rides).mergeMap((ride: Link) => {

				console.log(`Pour ce ride`)
				console.log(ride)

				// Resolve each value with a API call
				return this.httpClient.get<Ride>(
					`${ settings.apiEndpoint }${ ride['@id']}`)

				// Re-create the array
			}).toArray()	

		})
		.toPromise()
		.then((rides: Ride[]) => {

			// For each ride
			return Promise.all(rides.map((ride: Ride) => {

				// Populate the driver			
				if(ride.type == RideType.OFFER) {

					return this.httpClient.get<User>(
						`${ settings.apiEndpoint }/api/users/${ ride.driver['@id'] }`
					).toPromise().then((user: User) => {

						ride.driver = user;  

					})

				}

				return ride;

			}))
				// .then((rides: Ride[]) => {

				// 	// For each ride
				// 	return Promise.all(rides.map((ride: Ride) => {

				// 		// Populate the riders			
				// 		// For each rider

				// 		return Promise.all(ride.riders.map((rider: Link) => {

				// 			// Populte the user
				// 			return this.httpClient.get<User>(
				// 				`${ settings.apiEndpoint }/api/users/${ rider['@id'] }`
				// 			).toPromise()

				// 		})).then((riders: User[]) => {

				// 			return ride.riders = riders, ride; 

				// 		})

				// 	}))

				// })

		})

	}

	/*
	 *
	 * Used when a rider request a ride, to show him matches
	 *
	 * It makes the link with the src/pages/request-find-ride/ page and use the entry point /api/rides/:id/matches
	 *
	 */
	request_find_ride(): Promise<Ride[]> {


		return Promise.resolve([RidesMock[3], RidesMock[4]]) 

	}

	/*
	 *
	 * This function is used to PUT the ride on the server.
	 *
	 * It uses the entrypoint PUT /api/rides/:id
	 * After being computed, it leaves the ride as currentRide	
	 *
	 */
	offer_ride(ride: Ride) : Promise<any> {

		ride._id = hashRide(ride) 
		this._currentRide	= ride;

		return new Promise((resolve, reject) => {

			this.httpClient.put<Ride>(`${ settings.apiEndpoint }/api/rides/${ ride._id }`, ride).subscribe(data => resolve(data), error => reject(error))

		})
	}

}
