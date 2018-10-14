import { Component, Injector } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';

import { EditRidePage } from '../edit-ride/edit-ride'
import { MyRidesPage } from '../my-rides/my-rides'
import { SignInPage } from '../sign-in/sign-in';

import { UserProvider } from '../../providers/user/user'
import { RideProvider } from '../../providers/ride/ride'

import { User } from 'shared/models/user'
import { RideType } from 'shared/models/ride'

import { identify } from './need-auth'

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
	 *	This will be called when the user request or create a ride
	 *
	 */
	create_ride(type: RideType) {

		identify(this.userProvider, this.navCtrl, this.events).then( () => {
		
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
	
		identify(this.userProvider, this.navCtrl, this.events).then(( ) => {

			this.navCtrl.push(MyRidesPage);

		}).catch(() => {}) // Do nothing if the user could not be signed up

	}

}
