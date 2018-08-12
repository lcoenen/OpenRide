import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';

import { RideBoardPage } from '../ride-board/ride-board'; 

import { RideProvider, MyRides } from '../../providers/ride/ride';

/**
 * Generated class for the MyRidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-rides',
  templateUrl: 'my-rides.html',
})
export class MyRidesPage {

	myRides: myRides;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider	) {
  }

  ionViewDidLoad() {
		
		 this.rideProvider.myRides().then((myRides: MyRides) => {

		    this.myRides = myRides;

		 })
  }

  open_board(rider){
  
    console.log("Ouverture du rider", rider); 
    this.navCtrl.push(RideBoardPage);
  
  }

}
