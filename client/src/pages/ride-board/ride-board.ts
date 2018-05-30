import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ride } from 'shared/models/ride.ts'

import { RideProvider } from '../../providers/ride/ride';

import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the RideBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ride-board',
  templateUrl: 'ride-board.html',
})
export class RideBoardPage {

  boardpage: string;
	currentRide: Ride;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider) {

    this.boardpage = 'riders';
		this.currentRide = this.rideProvider.currentRide;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideBoardPage');
  }

  profile() {

    this.navCtrl.push(ProfilePage);

  }

}
