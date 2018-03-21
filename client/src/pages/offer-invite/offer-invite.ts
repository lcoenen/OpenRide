import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from 'shared/models/user';

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

  public riders: User[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ridersProvider: RidersProvider) {

		ridersProvider.invitable_riders()/*.then((riders: User[]) => {

        this.rides = riders  
				console.log(this.riders)

			})*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferInvitePage');
  }

  continue() {
  
    this.navCtrl.push(RideBoardPage);
  
  }

}
