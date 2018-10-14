import { Component } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';

import { EditRidePage } from '../edit-ride/edit-ride'
import { MyRidesPage } from '../my-rides/my-rides'
import { SignInPage } from '../sign-in/sign-in';

import { UserProvider } from '../../providers/user/user'
import { RideProvider } from '../../providers/ride/ride'

import { User } from 'shared/models/user'
import { RideType } from 'shared/models/ride'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public RideType: any;

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
		public events: Events,
		public rideProvider: RideProvider) {

		this.RideType = RideType;
		
	}

	/*
	 *
	 *	This function check if the user is connected. If not, it redirect to the 
	 *	IdentifyPage modal.
	 *
	 *	It return a Promise that will be resolved when the user will be logged in. 
	 *	If the user cannot log in and just dismiss the modal, the Promise will be broken
	 *
	 */
	public identify( ) : Promise<any>  {

		// Check that a cookie exists and is recognised by the server
		return this.userProvider.checkCookie().catch(() => {

			console.log('There is no cookie set (or the cookie is not valid). Opening the modal')
	
			// If it's not working, return a promise that will
			// resolve when the modal will be closed
			return new Promise((resolve, reject) => {
				
				if(this.userProvider.me === undefined) {

					this.navCtrl.push(SignInPage);
					this.events.subscribe('user:signedIn', (user: User) => {

						user ? resolve() : reject()

					});

				} else { resolve() }	
			
			})

		})

	}

	/*
	 *
	 *	This will be called when the user request or create a ride
	 *
	 */
	create_ride(type: RideType) {

		this.identify().then( () => {
		
			return this.rideProvider.createRide(type);
		
		}).then(( ) => {

			this.navCtrl.push(EditRidePage);

		}).catch(() => {}) // Do nothing if the user could not be signed up

	}

	/*
	 *
	 *	This will be called if the user click on the My Rides button
	 *
	 */
	my_rides() {
	
		this.identify().then(( ) => {

			this.navCtrl.push(MyRidesPage);

		}).catch(() => {}) // Do nothing if the user could not be signed up

	}

}
