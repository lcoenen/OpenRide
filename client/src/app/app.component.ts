import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EditRidePage } from '../pages/edit-ride/edit-ride';
import { MyRidesPage } from '../pages/my-rides/my-rides'
import { ProfilePage } from '../pages/profile/profile'
import { SignInPage } from '../pages/sign-in/sign-in'

import { UserProvider } from '../providers/user/user';
import { RideProvider } from '../providers/ride/ride';

import { User } from 'shared/models/user';
import { RideType } from 'shared/models/ride';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

	/*
	 *
	 *	This function check if the user is connected. If not, it redirect to the 
	 *	IdentifyPage modal.
	 *
	 *	It return a Promise that will be resolved when the user will be logged in. 
	 *	If the user cannot log in and just dismiss the modal, the Promise will be broken
	 *
	 *	NOTE: this code is wet from the home page
	 *
	 */
	public identify( ) : Promise<any>  {

		// Check that a cookie exists and is recognised by the server
		return this.userProvider.checkCookie().catch(() => {

			console.log('There is no cookie set (or the cookie is not valid). Opening the modal')
	
			// If it's not working, return a promise that will
			// resolve when the modal will be closed
			return new Promise((resolve, reject) => {
				
				if(this.userProvider.me === undefined) {

					let identifyModal = this.modalCtrl.create(SignInPage);
					identifyModal.onDidDismiss((user: User) => {

						user ? resolve() : reject()

					});
					identifyModal.present();

				} else { resolve() }	
			
			})

		})

	}

	constructor(public platform: Platform, 
	public statusBar: StatusBar, 
	public userProvider: UserProvider,
	public rideProvider: RideProvider,
	public modalCtrl: ModalController,
	public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  home() {
    this.nav.setRoot(HomePage);
  }

  myRides() {
		this.identify().then( () => 
    this.nav.setRoot(MyRidesPage))
  }

  offer() {
		this.identify().then( () => {
		
			return this.rideProvider.createRide(RideType.OFFER);
		
		}).then( () => 
    this.nav.setRoot(EditRidePage))
  }

  request() {
		this.identify().then( () => {
		
			return this.rideProvider.createRide(RideType.REQUEST)
		
		}).then( () => 
    this.nav.setRoot(EditRidePage))
  }

  profile() {
		this.identify().then( () => 
    this.nav.setRoot(ProfilePage))
  }
}
