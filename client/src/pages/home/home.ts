import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RequestRidePage } from '../requestride/requestride'
import { OfferRidePage } from '../offerride/offerride'
import { MyRidesPage } from '../my-rides/my-rides'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {
		
	}

	request_a_ride() {
	
		this.navCtrl.push(RequestRidePage);

	}

	my_rides() {
	
		this.navCtrl.push(MyRidesPage);

	}

	offer_a_ride() {
	
		this.navCtrl.push(OfferRidePage);

	}

}
