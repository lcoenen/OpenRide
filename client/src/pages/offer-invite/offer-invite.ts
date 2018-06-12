import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	 * This will show the RideBoard
	 *
	 */
  continue() {.
  
    this.navCtrl.push(RideBoardPage);
  
  }

	/*
	 *
	 * The user want to invite a rider
	 *
	 */
	public invite(ride: Ride) {
	
		this.rideProvider.invite(ride.riders[0])
			.then((rides: Ride[]) => {
        this.rides = rides;  
			})
	
	}

}
