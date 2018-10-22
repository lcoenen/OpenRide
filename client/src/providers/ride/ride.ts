import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { settings } from '../../config/config'

import { UserProvider } from '../user/user'

import { Ride, hashRide, RideType, MyRides } from 'shared/models/ride'
import { User } from 'shared/models/user'
import { Link, idLink } from 'shared/models/link'
import { Prospect, ProspectType } from 'shared/models/prospect'
import { RidesMock } from 'shared/mocks/ride';

function flatten_arrays_of_arrays<T>(ts: T[][]) : T[] {

	return [].concat.apply([], ts) 

}

/*
 *
 * This define if the ride is currently being created or edited
 *
 */
export enum EditMode {

	EDIT,
	CREATE

}

@Injectable()
export class RideProvider {

	public mode: EditMode;
	private _currentRide: Ride;

	constructor(
		public httpClient: HttpClient,
		public userProvider: UserProvider) {

	}

	/*
	 *
	 * Used to waits until an observer subscribes to it before it begins to emit items, and so such an ob waits until an observer subscribes to it before it begins to emit items, and so such an obshow which ride is currently selected
	 *
	 */
	get currentRide() {

		return this._currentRide;

	}

	set currentRide(ride: Ride) {

		this._currentRide = ride;	

	}

	/*
	 *
	 * 	This will grab the prospects of a specific ride
	 *
	 */
	prospects(ride: Ride): Promise<Prospect[]> {

		return this.httpClient.get<Prospect[]>(
			`${ settings.apiEndpoint }/api/rides/${ ride._id }/prospects`
		).toPromise()

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

			return <Promise<Ride>>
				this.httpClient.get(`${ settings.apiEndpoint }${ link['@id'] }`).toPromise()	

		}))

	}

	/*
	 *
	 * Used when a driver is offering a ride, to invite riders
	 * 
	 * It makes the link with the offer-invite and uses the entrypoint /api/rides/:id/matches
	 *
	 */
	matches(): Promise<Ride[]> {

		return this.httpClient.get<Link[]>(
			`${ settings.apiEndpoint }/api/rides/${ this.currentRide._id }/matches`)
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
	 * This function is used to POST the ride on the server.
	 *
	 * It uses the entrypoint POST /api/rides
	 * After being computed, it leaves the ride as currentRide	
	 *
	 */
	sendRide(ride: Ride) : Promise<any> {

		if(ride.type === undefined) throw Error('ride.type cannot be undefined');

		ride._id = hashRide(ride) 
		ride.confirmed = false;

		return new Promise((resolve, reject) => {

			this.httpClient.post<Ride>(`${ settings.apiEndpoint }/api/rides`, ride).subscribe(data => resolve(data), error => reject(error))

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
	 * This function is used to edit (PUT) a ride on the server.
	 *
	 * It uses the entrypoint PUT /api/rides/:id
	 * After being computed, it leaves the ride as currentRide	
	 *
	 */
	editRide(ride: Ride) : Promise<any> {

		if(ride.type === undefined) throw Error('ride.type cannot be undefined');

		return new Promise((resolve, reject) => {

			this.httpClient.put<Ride>(
				`${ settings.apiEndpoint }/api/rides/${ ride._id }`, {ride: ride})
				.subscribe(data => resolve(data), error => reject(error))

		}).then((answer: any) => {

			this._currentRide = ride;  

			return answer;

		})

	}

	/*
	 *
	 * This will grab the rides shown in myRides
	 *
	 */
	myRides() : Promise<MyRides> {

		// Takes a ride and a prospect and return the link to the 
		// adjacent ride (the ride that is not the target one)
		let find_adjacent_ride = (prospect: Prospect, ride: Ride) : Link => 
		(<Link>prospect.with)['@id'] == `/api/rides/${ ride._id }` ?
		<Link>prospect.ride:
		<Link>prospect.with

		// Resolve a ride form a prospect
		// Return a Promise<Ride>
		let resolve_ride_from_prospect = (prospect: Prospect, ride: Ride) : Promise<Ride> => 
		this.solveRides([find_adjacent_ride(prospect, ride)])
		.then((rides: Ride[]) => 
			this.populateRide(rides[0]).then((ride: Ride) =>  {
				ride.prospect = prospect; 
				return ride;
			})
		)

		// Find all the rides linked with one specific ride
		// Take a ride and return a Promise of a list of Ride
		let find_prospect_rides_from_ride = (ride: Ride) : Promise<Ride[]> =>
		this.httpClient.get(`${ settings.apiEndpoint }/api/rides/${ ride._id }/prospects`).toPromise()
		.then((prospects: Prospect[]) : Promise<Ride[]> => (

			//	Only take the prospect I have not created
			Promise.all(prospects.filter((prospect: Prospect) => prospect.ride['@id'] == `/api/rides/${ ride._id }`)
				.map(
					(prospect: Prospect) : Promise<Ride> => resolve_ride_from_prospect(prospect, ride)	
				))	
		))

		// Find the list of prospects
		// Takes a list of rides and return a Promise<Ride[]>
		let find_prospect_list = (rides: Ride[]) : Promise<Ride[]> => (

			Promise.all(rides.map((ride: Ride): Promise<Ride[]> => find_prospect_rides_from_ride(ride)))
			.then((adjacents_rides_per_ride: Ride[][]): Ride[] => (
				flatten_arrays_of_arrays(adjacents_rides_per_ride)		
			))
		)

		return this.httpClient.get(`${ settings.apiEndpoint }/api/session/me/rides`).toPromise()

		//Populate the rides
		.then((rides: Ride[]) => Promise.all(rides.map((ride: Ride) => this.populateRide(ride))))

		// Grab all the prospects
		.then((rides: Ride[]) => 

			find_prospect_list(rides)	
			.then((adjacentsRides: Ride[]) : MyRides => ( 
				{
					myRides: rides.filter((ride: Ride) => ride.type == RideType.OFFER),
					myRequests: rides.filter((ride: Ride) => ride.type == RideType.REQUEST),
					myProspects: adjacentsRides
				}	
			))

		)

	}

	/*
	 *
	 * This will be called when an user want to join a ride he's been invited to or requested
	 *
	 */
	join(ride: Ride) {

		/*
					The user to add will be me if I'm accepting an offer.
					Otherwise it will be the rider of the REQUEST
		 */
		let targetUserId = ride.type == RideType.OFFER? this.userProvider.me._id : (<User>ride.riders[0])._id;
		let targetRideId = ride.type == RideType.OFFER? ride['_id']: idLink(<Link>ride.prospect.ride);

		return this.httpClient.patch(
			`${ settings.apiEndpoint }/api/rides/${ targetRideId }`, {join: targetUserId}).toPromise()
			.then(() => {

				return this.httpClient.get(`${ settings.apiEndpoint }/api/rides/${ targetRideId }`).toPromise()

			})
			.then((ride: Ride) => this.populateRide(ride))
			.then((ride: Ride) => {

				this._currentRide = ride;
				return 'OK'	

			})

	}

	/*
	 *
	 *	The user want to edit a ride
	 *
	 */
	startRideEdition(ride: Ride){

		this.mode = EditMode.EDIT;
		this.currentRide = ride;

	}


	/*
	 *
	 * This will be called when the user want to create a ride
	 *
	 */
	createRide(type: RideType) {

		this.mode = EditMode.CREATE;

		this.currentRide = {

			type: type,
			riders: []

		}

	}

	/*
	 *
	 * This will confirm the ride
	 *
	 */
	confirm(ride: Ride){

		this.httpClient.put(`${ settings.apiEndpoint }/api/rides/${ ride._id }`, 
			{ ride: {confirmed: true } }).toPromise().catch((err) =>
				console.error('Could not confirm the ride', err))

	}

	/*
	 *
	 * This means the said user will leave the ride 
	 *
	 */
	depart(ride: Ride, user: User) : Promise<any> {
	
		return this.httpClient.patch(`${ settings.apiEndpoint }/api/rides/${ ride._id }`, 
			{ depart: this.userProvider.me._id }).toPromise()
	
	}

	/*
	 *
	 * This means we want to cancel the ride
	 *
	 */
	cancel(ride: Ride) { 
	
		return this.httpClient.delete(`${ settings.apiEndpoint}/api/rides/${ ride._id }`)
			.toPromise();
	
	}

	/*
	 *
	 * This will finalize the ride and release the fund
	 *
	 */
	finalize(ride: Ride) {
	
		console.log('Finalizing the ride')	
	
	}

	/*
	 *
	 * This will return a list of user to rate
	 *
	 */
	toRate() : User[] {

		let ride = this.currentRide;
		return [<User>ride.driver].concat(<User[]>ride.riders)
	
	}

}

export { MyRides, ProspectType }
