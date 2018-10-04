import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
	Events, ViewController } from 'ionic-angular';

import { IdentifyLoginPage } from '../identify-login/identify-login';
import { IdentifySignupPage } from '../identify-signup/identify-signup';

import { User } from 'shared/models/user';

/**
 * Generated class for the IdentifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identify',
  templateUrl: 'identify.html',
})
export class IdentifyPage {

	public loginRoot = IdentifyLoginPage;
	public signupRoot = IdentifySignupPage;

	constructor(public navCtrl: NavController, 
		public viewCtrl: ViewController,
		public events: Events,
		public navParams: NavParams) {

		this.events.subscribe('identify:identified', (user) => {

			this.authentified(user);
		
		})
		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentifyPage');
  }

	/*
	 *
	 * This mean the user have been authentified
	 *
	 */
	public authentified(user: User) {
	
		this.viewCtrl.dismiss(user);	
	
	}

	/*
	 *
	 * This is triggered by the close button
	 *
	 */
	public closeModal() {
	
		this.viewCtrl.dismiss()	
	
	}

}
