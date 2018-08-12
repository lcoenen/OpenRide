import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ride } from 'shared/models/ride';

import { RideProvider } from '../../providers/ride/ride';

/**
 * Generated class for the RequestFindRidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-find-ride',
  templateUrl: 'request-find-ride.html',
})
export class RequestFindRidePage {

  rides: Ride[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rideProvider: RideProvider) {

    this.rideProvider.request_find_ride().then((rides: Ride[]) => {

      this.rides = rides; 

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFindRidePage');
  }

}
