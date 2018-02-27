import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';
import { RidersMockData } from './rider-mock';

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

  drivers: Rider[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.drivers = RidersMockData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFindRidePage');
  }

}
