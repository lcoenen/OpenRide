import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user'

import { User } from 'shared/models/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	public user: User;

	constructor(public navCtrl: NavController, 
	public navParams: NavParams,
	public userProvider: UserProvider) {
  }

  ionViewDidEnter() {

		this.userProvider.getUser().then((user: User) => {
			this.user = user;
		})

  }

}
