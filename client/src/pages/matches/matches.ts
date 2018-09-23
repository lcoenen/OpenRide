import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User } from 'shared/models/user';
import { Ride, RideType } from 'shared/models/ride';

import { RideBoardPage } from '../ride-board/ride-board'; 
import { MyRidesPage } from '../my-rides/my-rides';

import { RideProvider } from '../../providers/ride/ride';

/**
 * Generated class for the OfferInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

	/*
	 *
	 * This is rides that the riders are looking for
	 *
	 */
  public rides: Ride[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
		public toastCtrl: ToastController,
    public rideProvider: RideProvider) {

		/*
		 *
		 * Subscribe to a stream of ride from rideProviders
		 *
		 */
		rideProvider.matches().then((rides: Ride[]) => {
        this.rides = rides;  
			})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferInvitePage');
  }

	/* 
	 *
	 * This redirect to the ride board
	 *
	 */
  continue() {

		if(this.rideProvider.currentRide.type == RideType.OFFER) 
			this.navCtrl.push(RideBoardPage);
		else
			this.navCtrl.push(MyRidesPage);
  
  }

	/*
	 * 
	 * This means the user is inviting a ride request
	 *
	 */
	invite(invitedRide: Ride) {
	
		this.rideProvider.invite(invitedRide).then((answer) => {

		  const toast = this.toastCtrl.create({
				message: 'Invite sent', 
				duration: 3000
			})
			toast.present();

			this.rides = this.rides.filter((ride: Ride) => ride._id != invitedRide._id)

		})
	
	}

}
