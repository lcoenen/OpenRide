import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
	ToastController, ViewController, Events, ModalController } from 'ionic-angular';

import { EditProfilePage } from '../edit-profile/edit-profile';

import { UserProvider } from '../../providers/user/user';

import { User, Credentials } from 'shared/models/user';


/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

	/*
	 *
	 *	These credentials will be two-ways bounded to
	 *	the inputs and send to UserProvider
	 *
	 */
	public credentials: Credentials = { login: '', password: ''} 

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public toastCtrl: ToastController,
		public userProvider: UserProvider) {

  }

  ionViewDidLoad() {

	}
	
	/*
	 *
	 *	This will attempt to login the user and display the appropriate
	 *	toast if it doesn't work
	 *
	 * 	@event This method will emit an 'identify:identified' event to 
	 * 	signal the overlying modal to close.
	 *
	 */
	signIn() {

		this.userProvider.signIn(this.credentials).then((user: User) => {

			this.events.publish('user:signedIn', user)
			this.navCtrl.pop()

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
	toSignUp() {

	
		this.userProvider.newUser()
		this.navCtrl.pop()
		this.navCtrl.push(EditProfilePage);

	}


}
