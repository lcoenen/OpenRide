import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RequestRidePage } from '../requestride/requestride.ts'
import { OfferRidePage } from '../offerride/offerride.ts'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(	public navCtrl: NavController) {
		
	}

	request_a_ride() {
	
		this.navCtrl.push(RequestRidePage);

	}

	offer_a_ride() {
	
		this.navCtrl.push(OfferRidePage);

	}

}
