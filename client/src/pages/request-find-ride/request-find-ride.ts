import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ride } from 'shared/models/ride';

import { RidersProvider } from '../../providers/riders/riders';

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

  drivers: Ride[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ridersProvider: RidersProvider) {

    this.drivers = this.ridersProvider.request_find_ride();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFindRidePage');
  }

}
