
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

import { AddressModalPage } from '../address-modal/address-modal'; 

import { RideProvider } from '../../providers/ride/ride';

import { NominatimToGeoJSON } from '../../providers/nominatim/nominatim';

enum PayementPhilosophy {

	FREE,
	PART,
	REFUNDED, 
	PAID

}

@IonicPage()
@Component({
	selector: 'page-editride',
	templateUrl: 'editride.html',
})
export class EditRidePage  {

	public ride: Ride;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public rideProvider: RideProvider) {
	}

	ionViewDidLoad() {
	}

	valid() {

	/*

		this.rideProvider.offer_ride({

			origin: NominatimToGeoJSON(this.recent_addresses[this.originId]),
			destination: NominatimToGeoJSON(this.recent_addresses[this.destinationId]),
			riding_time: this.riding_time,
			payement: Number(this.payement),
			riders: [],
			type: RideType.OFFER

		*/

		this.rideProvider.offer_ride(this.ride).then(() => {

			this.navCtrl.push(MatchesPage);

		}).catch((err) => {

		  console.error(`ERROR: cannot put ride`)  
			console.error(err)

		})

	}

}
