import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';
import { RidersMockData } from './rider-mock';

import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the RideBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ride-board',
  templateUrl: 'ride-board.html',
})
export class RideBoardPage {

  boardpage: string;
  riders: Rider[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.boardpage = 'riders';
    this.riders = RidersMockData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideBoardPage');
  }

  profile() {

    this.navCtrl.push(ProfilePage);

  }

}
