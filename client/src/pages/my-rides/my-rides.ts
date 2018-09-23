import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RideBoardPage } from '../ride-board/ride-board'; 
import { MatchesPage } from '../matches/matches'; 

import { Ride, RideType } from 'shared/models/ride';
import { User } from 'shared/models/user';

import { UserProvider }  from '../../providers/user/user';

import { RideProvider, MyRides, ProspectType } from '../../providers/ride/ride';

/**
 * Generated class for the MyRidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation.  */ @IonicPage() @Component({ selector: 'page-my-rides',
	templateUrl: 'my-rides.html',
})
export class MyRidesPage {

	myRides: MyRides;
	loading: boolean;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider,
		public userProvider: UserProvider	) {

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
	open_board(ride: Ride){

		this.rideProvider.currentRide = ride;
		this.navCtrl.push(RideBoardPage);

	}

	/*
	 *
	 * This will join and open the ride
	 *
	 */
	join(ride: Ride) {

		this.rideProvider.join(ride).then((ride) => {

		  this.navCtrl.push(RideBoardPage)  
			this.ionViewDidLoad()

		})
		
	}

	/*
	 * 
	 * This will tell if a ride is owned by the user
	 *
	 */
	mine(ride: Ride) {

		let owner: User = <User>(ride.type == RideType.OFFER?
			ride.driver: ride.riders[0]);

		console.log('owner is', owner)

		return owner._id == this.userProvider.me._id;

	}

	/*
	 *
	 * This will open the matches page
	 *
	 */
	matches(ride: Ride){ 

		this.rideProvider.currentRide = ride;
		this.navCtrl.push(MatchesPage);

	}

}
