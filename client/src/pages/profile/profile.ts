import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user'

import { EditProfilePage } from '../edit-profile/edit-profile'

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

		this.user = this.userProvider.currentUser;

  }

	edit(user: User) {

		this.userProvider.startUserEdition(user)
		this.navCtrl.push(EditProfilePage) 

	}

	ionViewWillEnter(){

		console.log('This.user', this.user)
		this.user = this.userProvider.currentUser;

	}

	me(user: User) : boolean { 
	
		return user == this.userProvider.me;	
	
	}

}
