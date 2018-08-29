import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';

import { RideBoardPage } from '../ride-board/ride-board'; 

import { RideProvider, MyRides } from '../../providers/ride/ride';

/**
 * Generated class for the MyRidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-my-rides',
	templateUrl: 'my-rides.html',
})
export class MyRidesPage {

	myRides: MyRides;
	loading: boolean;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider	) {

		this.myRides = {
			myRides: [],		
			myRequests: [],		
			myProspects: [],		
		}

	}

	ionViewDidLoad() {

		this.rideProvider.myRides().then((myRides: MyRides) => {

			this.loading = true;
			
			this.myRides = myRides;

		})
	}

	/*
	 *
	 * This will open the RideBoard
	 *
	 */
	open_board(ride){

		this.rideProvider.currentRide = ride;
		this.navCtrl.push(RideBoardPage);

	}

	/*
	 *
	 * This will join and open the ride
	 *
	 */
	join(ride) {
		
		this.rideProvider.join(ride).then((ride) => {

		  this.navCtrl.push(RideBoardPage)  

		})
		
	}

}
