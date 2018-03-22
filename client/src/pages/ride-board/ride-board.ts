import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ride } from './ride';
import { RidersMockData } from './rider-mock';

import { RidersProvider } from '../../providers/riders/riders';

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
		public ridersProvider: RidersProvider) {

    this.boardpage = 'riders';
		this.currentRide = this.ridersProvider.currentRide;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideBoardPage');
  }

  profile() {

    this.navCtrl.push(ProfilePage);

  }

}
