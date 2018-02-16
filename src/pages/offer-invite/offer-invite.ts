import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Rider } from './rider';
import { RidersMockData } from './rider-mock';

import { RideBoardPage } from '../ride-board/ride-board'; 

/**
 * Generated class for the OfferInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-invite',
  templateUrl: 'offer-invite.html',
})
export class OfferInvitePage {

  public riders: Rider[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.riders = RidersMockData; 

    console.log(this.riders)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferInvitePage');
  }

  continue() {
  
    this.navCtrl.push(RideBoardPage);
  
  }

}
