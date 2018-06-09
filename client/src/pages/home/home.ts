import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { RequestRidePage } from '../requestride/requestride'
import { OfferRidePage } from '../offerride/offerride'
import { MyRidesPage } from '../my-rides/my-rides'
import { IdentifyPage } from '../identify/identify';

import { UserProvider } from '../../providers/user/user'

import { User } from 'shared/models/user'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {


	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		public userProvider: UserProvider) {
		
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

		return new Promise((resolve, reject) => {
			
			if(this.userProvider.me === undefined) {

				let identifyModal = this.modalCtrl.create(IdentifyPage);
				identifyModal.onDidDismiss((user: User) => {

					user ? resolve() : reject()

				});
				identifyModal.present();

			}	
		
		})

	}

	/*
	 *
	 *	This will be called when the user request a ride
	 *
	 */
	request_a_ride() {

		this.identify().then(( ) => {

			this.navCtrl.push(RequestRidePage);

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

	/*
	 *	This will be called if the user click on the card 'Offer a ride'
	 *
	 *
	 */
	offer_a_ride() {
	
		this.identify().then(( ) => {

			this.navCtrl.push(OfferRidePage);

		}).catch(() => {}) // Do nothing if the user could not be signed up

	}

}
