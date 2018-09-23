
/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Ride, RideType } from 'shared/models/ride';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ModalController, NavParams, IonicPage, NavController } from 'ionic-angular';

import { Component } from '@angular/core';
// import { Input, OnChanges, SimpleChange } from '@angular/core';

import { MatchesPage } from '../matches/matches'; 

import { RideProvider, EditMode } from '../../providers/ride/ride';

@IonicPage()
@Component({
	selector: 'page-edit-ride',
	templateUrl: 'edit-ride.html',
})
export class EditRidePage  {

	public ride: Ride;

	public mode: EditMode;
	public RideType: any; 

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public rideProvider: RideProvider) {

		this.mode = this.rideProvider.mode;
		this.ride = this.rideProvider.currentRide;
		this.RideType = RideType;

	}

	ionViewDidLoad() {
	}

	valid() {

		this.rideProvider.offer_ride(this.ride).then(() => {

			this.navCtrl.push(MatchesPage);

		}).catch((err) => {

		  console.error(`ERROR: cannot put ride`)  
			console.error(err)

		})

	}

}
