import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { NominatimProvider } from '../../providers/nominatim/nominatim';
import { AutoCompleteComponent } from 'ionic2-auto-complete';

import { ViewChild } from '@angular/core';

import L from "leaflet";

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

	public address: any;
	public center: number[];
	public zoom: number;
	public layers: any[] = [];
	public map_options: object = {
		layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
		zoom: 5,
    center: [42.044355, -74.1185505 ]};

  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;

  constructor(
		public viewCtrl: ViewController,
		public nominatimProvider: NominatimProvider) {
  }

  ionViewDidLoad() {
  }

	itemSelected(selection: any) {
	
		this.center = [selection.lat, selection.lon];
		this.zoom = 14;
		this.layers = [L.marker(selection.lat, selection.lon)];

		this.address = selection;

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
