import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams,
	ToastController, Events, ViewController } from 'ionic-angular';

import { User } from 'shared/models/user';

import { UserProvider, EditMode } from '../../providers/user/user'

import { SignInPage } from '../sign-in/sign-in'

@IonicPage()
@Component({
	selector: 'edit-profile-signup',
	templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

	public EditMode: any = EditMode;

	/*
	 * 
	 * This state if the user is currently being created or edited
	 *
	 */
	public mode: EditMode;

	/*
	 *
	 *	This user will be two ways bounded to
	 *	the inputs and be sent to UserProvider
	 *
	 */
	public user: User;

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
		public events: Events,
		public toastCtrl: ToastController,
		public userProvider: UserProvider) {

		this.user = this.userProvider.currentUser;
		this.mode = this.userProvider.mode;

		if(this.mode == EditMode.EDIT)
			this.user.password = this.confirmPassword  = 'password';

	}

	ionViewWillEnter() {

	}

	/*
	 *
	 *	This function will attempt to sign up the user and show the
	 *	appropriate toast if needed
	 *
	 */
	public signUp( ) {

		// Check the password confirmation
		if(this.user.password == 'password' && this.mode == EditMode.CREATE)  {

			const toast = this.toastCtrl.create({
				message: '"password" is not a real password. Please chose another one.',
				duration: 3000
			});
			toast.present();

		}

		if(this.user.password != this.confirmPassword)  { 
			const toast = this.toastCtrl.create({
				message: 'Passwords aren\'t matching',
				duration: 3000
			});
			toast.present();

		}
		else {

			// Sending the user to the service
			this.userProvider.signUp(this.user).then((user: User) => {

				this.events.publish('user:signedIn', user)
				this.navCtrl.pop()
			  console.log('User have been signed up')  

			}).catch((error) => {


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
	 *	This will happen when the user is trying to effectively edit his profile
	 *
	 */
	edit() {

		if(this.user.password != this.confirmPassword)  { 
			const toast = this.toastCtrl.create({
				message: 'Passwords aren\'t matching',
				duration: 3000
			});
			toast.present();

		}

		if(this.user.password == 'password')
			this.user.password = undefined;
		
		this.userProvider.editUser(this.user).then((user: User) => {

			this.navCtrl.pop();
			console.log('The user have been edited')

		})

	}

	/*
	 *
	 *	This will change the page to the sign in page
	 *
	 */
	toSignIn() {

		this.navCtrl.pop()
		this.navCtrl.push(SignInPage)
	
	}

	/*
	 *
	 *	This will discard the changes
	 *
	 */
	discard() {

		this.userProvider.discard();
		this.navCtrl.pop()

	}

}
