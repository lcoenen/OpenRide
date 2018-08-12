import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';
import { RidersMockData } from './rider-mock';

import { RideBoardPage } from '../ride-board/ride-board'; 

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

  riders: Rider[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.riders = RidersMockData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRidesPage');
  }

  open_board(rider){
  
    console.log("Ouverture du rider", rider); 
    this.navCtrl.push(RideBoardPage);
  
  }

}
