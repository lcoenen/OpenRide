import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, Events } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user'

import { User, Credentials } from 'shared/models/user';


/**
 * Generated class for the IdentifyLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identify-login',
  templateUrl: 'identify-login.html',
})
export class IdentifyLoginPage {

	/*
	 *
	 *	These credentials will be two-ways bounded to
	 *	the inputs and send to UserProvider
	 *
	 */
	public credentials: Credentials = { login: '', password: ''} 

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public events: Events,
		public userProvider: UserProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentifyLoginPage');
	}
	
	/*
	 *
	 *	This will attempt to login the user and display the appropriate
	 *	toast if it doesn't work
	 *
	 * 	NOTE: 
	 * 	Using login as a synonym of username is a mistake from 
	 * 	french language. Sorry for that.
	 *
	 * 	@event This method will emit an 'identify:identified' event to 
	 * 	signal the overlying modal to close.
	 *
	 */
	login() {

		this.userProvider.login(this.credentials).then((user: User) => {

			this.events.publish('identify:identified', user)

		}).catch((error:any) => {

			if(error == 'UNKNOWN_USER') { 

				const toast = this.toastCtrl.create({
					message: 'Cannot find such user',
					duration: 3000
				});
				toast.present();

			}
			else if(error== 'BAD_PASSWORD') {
			
				const toast = this.toastCtrl.create({
					message: 'The passwrong is word',
					duration: 3000
				});
				toast.present();
			
			}
			else {

				console.error('Unexpected error caught: ', error)
			
				const toast = this.toastCtrl.create({
					message: 'Something went wrong :(',
					duration: 3000
				});
				toast.present();
			
			}

		})
	
	}

	/*
	 *
	 *	This will change the page to the signup page
	 *
	 */
	tosignup() {
	
	  this.navCtrl.parent.select(1);
	
	}


}
