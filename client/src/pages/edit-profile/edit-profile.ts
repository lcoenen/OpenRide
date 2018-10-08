import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams,
	ToastController, Events } from 'ionic-angular';

import { User } from 'shared/models/user';

import { UserProvider } from '../../providers/user/user'

@IonicPage()
@Component({
	selector: 'edit-profile-signup',
	templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

	/*
	 * 
	 * This define if the login link will be shown or not
	 *
	 */
	@Input() showSignIn: boolean = true;

	/*
	 *
	 *	This user will be two ways bounded to
	 *	the inputs and be sent to UserProvider
	 *
	 */
	public user: User = {
		name: undefined,
		age: undefined,
		place_of_origin: undefined,
		reputation: 0,
		email: undefined,
		password: undefined,
		presentation: undefined,
		vehicle: undefined,
		charge_per_km: undefined
	}

	/*
	 *
	 * This is the unhashed passworh. The password have to 
	 * be hashed before being sent to the server
	 *
	 */
	public clearPassword: string = '';

	/*
	 *
	 *	This is the password confirmation
	 *
	 */
	public confirmPassword: string;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public events: Events,
		public userProvider: UserProvider) {
	}

	/*
	 *
	 *	This function will attempt to sign up the user and show the
	 *	appropriate toast if needed
	 *
	 */
	public signup( ) {

		// Check the password confirmation

		if(this.user.password != this.confirmPassword)  {

			const toast = this.toastCtrl.create({
				message: 'Passwords aren\'t matching',
				duration: 3000
			});
			toast.present();

		}
		else {

			// Sending the user to the service
			this.userProvider.signup(this.user).then((user: User) => {


				this.events.publish('identify:identified', user)
			  console.log('User have been signed up')  

			}).catch((error) => {

				console.error('User cannot be signed up')
				console.error(error)

				if(error == 'DUPLICATE') { 

					const toast = this.toastCtrl.create({
						message: 'The user already exists',
						duration: 3000
					});
					toast.present();

				}
				else {
				
					const toast = this.toastCtrl.create({
						message: 'Something went wrong :(',
						duration: 3000
					});
					toast.present();
				
				}
				

			})
		
		}

	}

	/*
	 *
	 *	This will change the page to the login page
	 *
	 */
	toSignIn() {
	
	  this.navCtrl.pop()
	
	}

}
