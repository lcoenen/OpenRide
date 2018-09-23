import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { EditRidePage } from '../editride/editride'
import { MyRidesPage } from '../my-rides/my-rides'
import { IdentifyPage } from '../identify/identify';

import { UserProvider } from '../../providers/user/user'
import { RideProvider } from '../../providers/ride/ride'

import { User } from 'shared/models/user'
import { Ride, RideType } from 'shared/models/ride'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public RideType: any;

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		public userProvider: UserProvider,
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

		// Check that a cookie exists
		return this.userProvider.checkCookie().catch(() => {
	
			// If it's not working, return a promise that will
			// resolve when the modal will be closed
			return new Promise((resolve, reject) => {
				
				if(this.userProvider.me === undefined) {

					let identifyModal = this.modalCtrl.create(IdentifyPage);
					identifyModal.onDidDismiss((user: User) => {

						user ? resolve() : reject()

					});
					identifyModal.present();

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
