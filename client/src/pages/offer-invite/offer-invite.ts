import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { User } from 'shared/models/user';
import { Ride } from 'shared/models/ride';

import { RideBoardPage } from '../ride-board/ride-board'; 

import { RideProvider } from '../../providers/ride/ride';

/**
 * Generated class for the OfferInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-invite',
  templateUrl: 'offer-invite.html',
})
export class OfferInvitePage {

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
		rideProvider.invitable_ride().then((rides: Ride[]) => {
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
  
    this.navCtrl.push(RideBoardPage);
  
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
