import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { NominatimProvider } from '../../providers/nominatim/nominatim';

/**
 * Generated class for the AddressModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-modal',
  templateUrl: 'address-modal.html',
})
export class AddressModalPage {

  private address:string;

  constructor(
		public viewCtrl: ViewController,
		public nominatimProvider: NominatimProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressModalPage');
  }

  pick(){
    console.log('Address is ');
    console.log(this.address);

    this.viewCtrl.dismiss({address: this.address});

  }

	// find_address(){

	// 	this.nominatimProvider
	// 		.find_address(this.address)
	// 		.subscribe( (data) => {

	// 		  console.log(`Proposed address`)  
	// 			console.log(data)

	// 		});

	// }

  cancel(){
    this.viewCtrl.dismiss({address: undefined});   
  }

}
