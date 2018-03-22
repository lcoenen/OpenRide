import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from 'shared/models/user';
import { Ride } from 'shared/models/ride';

import { RideBoardPage } from '../ride-board/ride-board'; 

import { RidersProvider } from '../../providers/riders/riders';

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

  public rides: Ride[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ridersProvider: RidersProvider) {

		ridersProvider.invitable_riders().subscribe((rides: Ride[]) => {
				console.log(`Recieved an answer: l.31`)
				console.log(rides)
        this.rides = rides  

			})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferInvitePage');
  }

  continue() {
  
    this.navCtrl.push(RideBoardPage);
  
  }

}
