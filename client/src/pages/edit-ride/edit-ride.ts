
/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Ride, RideType } from 'shared/models/ride';

import { ModalController, NavParams, IonicPage, NavController } from 'ionic-angular';

import { Component } from '@angular/core';

import { MatchesPage } from '../matches/matches'; 

import { RideProvider, EditMode } from '../../providers/ride/ride';

@IonicPage()
@Component({
	selector: 'page-edit-ride',
	templateUrl: 'edit-ride.html',
})
export class EditRidePage  {

	public ride: Ride;

	/*
	 *
	 * This will be the original ride (in case it's discaded
	 *
	 */
	public originalRide: Ride;

	public mode: EditMode;
	public RideType: any = RideType; 
	public EditMode: any = EditMode;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public rideProvider: RideProvider) {

		this.mode = this.rideProvider.mode;
		this.ride = this.rideProvider.currentRide;

	}

	ionViewDidLoad() {

		this.originalRide = {... this.ride}

	}


	/*
	 *
	 * This will valid the ride
	 *
	 */
	valid() {

		if(this.mode == EditMode.CREATE)
			return this.rideProvider.sendRide(this.ride).then(() => {

				this.navCtrl.pop();
				this.navCtrl.push(MatchesPage)

			}
			).catch((err) => {

				console.error(`ERROR: cannot put ride`)  
				console.error(err)

			})
		else 
			return this.rideProvider.editRide(this.ride).then(() => 
				this.navCtrl.pop() )
				.catch( (err) => {
				
				console.error('ERROR: cannot edit ride')
				console.error(err)

			})		

	}

	/*
	 *
	 *	This will discard the changes
	 *
	 */
	discard() {

		this.ride = this.originalRide;
		this.navCtrl.pop()

	}

}
