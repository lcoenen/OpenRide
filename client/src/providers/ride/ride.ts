import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
;
import { settings } from '../../config/config'

import { Ride, hashRide, RideType, MyRides } from 'shared/models/ride'
import { User } from 'shared/models/user'
import { Link } from 'shared/models/link'
import { Prospect } from 'shared/models/prospect'
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
	 * This is used to populate the ride (link the rides and drivers)
	 *
	 */
	populateRide(ride: Ride): Promise<Ride> {

		// Populate the driver
		let populate_driver = (ride: Ride) => {

			if(ride.type == RideType.OFFER) 
				return this.httpClient.get<User>(
					`${ settings.apiEndpoint }${ ride.driver['@id'] }`
				).toPromise().then((user: User) => {
					return ride.driver = user, ride
				}	
				)
			else 		
				return Promise.resolve(ride);

		}

		let populate_riders = (ride: Ride) => {

			// Populate the riders			
			// For each rider

			return Promise.all((<Link[]>ride.riders).map((rider: Link) => {

				// Populte the user
				return this.httpClient.get<User>(
					`${ settings.apiEndpoint }${ rider['@id'] }`
				).toPromise()

			})).then((riders: User[]) => {

				return ride.riders = riders, ride; 

			})

		}

		return populate_driver(ride).then((ride) => {

			return populate_riders(ride)  

		})

	}

	/*
	 *
	 * This will be used to resolve a list of link to some Rides
	 *
	 */
	solveRides(rides: Link[]) : Promise<Ride[]> {

		return Promise.all(rides.map((link: Link) => {

			return this.httpClient.get(`${ settings.apiEndpoint }${ link['@id'] }`).toPromise()	

		}))

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
		.toPromise()
		//	Solve the list of Link
		.then((ridesLinks: Link[]) => this.solveRides(ridesLinks))
		// For each ride, populate the Ride
		.then((rides: Ride[]) => Promise.all(rides.map((ride: Ride) => this.populateRide(ride))))

	}

	/*
	 *
	 * This is used to send an invite to a ride
	 *
	 */
	invite(ride: Ride) {

		// Post a prospect for that ride
		return this.httpClient.post(
			`${ settings.apiEndpoint }/api/rides/${ ride['_id'] }/prospects`, {
				with: {
					'@id': `/api/rides/${ this._currentRide._id }`	
				}	
			} ).toPromise()

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

		return new Promise((resolve, reject) => {

			this.httpClient.put<Ride>(`${ settings.apiEndpoint }/api/rides/${ ride._id }`, ride).subscribe(data => resolve(data), error => reject(error))

		}).then((answer: any) => {

			this.httpClient.get<Ride>(`${ settings.apiEndpoint }/api/rides/${ ride._id }`).toPromise().then((createdRide: Ride) => {

				this.populateRide(createdRide).then((populatedRide: Ride) => {

					this._currentRide = populatedRide  

				});

				return answer;


			})

		})
	}

	/*
	 *
	 * This will grab the rides shown in myRides
	 *
	 */
	myRides() : Promise<MyRides> {

		return this.httpClient.get(`${ settings.apiEndpoint }/api/session/me/rides`).toPromise()
		//Solve the rides
		//.then((rides: Link[]) => this.solveRides(rides))
		//Populate the rides
		.then((rides: Ride[]) => Promise.all(rides.map((ride: Ride) => this.populateRide(ride))))
		// Grab all the prospects
		.then((rides: Ride[]) => 
			// From one ride, grab the list of adjacent ride
			Promise.all(rides.map((ride: Ride): Promise<Ride[]> =>
				this.httpClient.get(`${ settings.apiEndpoint }/api/rides/${ ride._id }/prospects`).toPromise()
				// From the prospect list, grab the list of adjacent ride
				.then((prospects: Prospect[]) : Promise<Ride[]> => 
					// Now that I have all the prospect, find the partner ride (the one I've been invited / requested to join)
					// I'll get a Link, so solve it, then populate it
					Promise.all(prospects.map((prospect: Prospect): Promise<Ride> =>
						this.solveRides(
							prospect.with['@id'] == `/api/rides/${ ride._id }` ?
							prospect.ride:
							prospect.with
						).then(this.populateRide)

					))
					// Now I have a list of adjacents ride, but having an array for each ride. I have to flatten everything
				))
				.then((adjacentsRides: Ride[][]) : Ride[] => [].concat.apply([], adjacentsRides))
				.then((adjacentsRides: Ride[]) : MyRides => ( 
					{
						myRides: rides.filter((ride: Ride) => ride.type == RideType.OFFER),
						myRequests: rides.filter((ride: Ride) => ride.type == RideType.REQUEST),
						myProspects: adjacentsRides
					}	
				))

			))

	}

}
