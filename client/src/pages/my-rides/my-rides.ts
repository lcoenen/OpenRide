import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { RideBoardPage } from '../ride-board/ride-board'; 
import { MatchesPage } from '../matches/matches'; 
import { EditRidePage } from '../edit-ride/edit-ride';

import { Ride, RideType } from 'shared/models/ride';
import { User } from 'shared/models/user';

import { UserProvider }  from '../../providers/user/user';

import { RideProvider, MyRides } from '../../providers/ride/ride';


/**
 * Generated class for the MyRidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation.  */ @IonicPage() @Component({ selector: 'page-my-rides',
	templateUrl: 'my-rides.html',
})
export class MyRidesPage {

	myRides: MyRides;
	loading: boolean;

	public RideType: any = RideType;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public rideProvider: RideProvider,
		public userProvider: UserProvider	) {

		this.myRides = {
			myRides: [],		
			myRequests: [],		
			myProspects: [],		
		}

	}

	ionViewWillEnter() {

		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		loading.present()

		this.rideProvider.myRides().then((myRides: MyRides) => {

			this.loading = true;
			
			this.myRides = myRides;

			loading.dismiss()

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
	 * This will be called when the user want to edit a ride
	 *
	 */
	edit_ride(ride: Ride){ 

		console.log('Editing ride')

		this.rideProvider.editRide(ride);
		this.navCtrl.push(EditRidePage);

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

	/*
	 *
	 * This will open the request page
	 *
	 */
	create(type: RideType) {

		this.rideProvider.createRide(type)
		this.navCtrl.push(EditRidePage);


	}

}
