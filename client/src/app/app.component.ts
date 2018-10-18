import { Component, ViewChild, Injector } from '@angular/core';
import { Nav, Platform, Events, NavController } from 'ionic-angular';

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

import { identify } from '../pages/home/need-auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

	constructor(public platform: Platform, 
		public statusBar: StatusBar, 
		public events: Events,
		public rideProvider: RideProvider,
		public userProvider: UserProvider,
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
		identify(this.userProvider, this.nav, this.events).then( () => 
    this.nav.push(MyRidesPage))
  }

  offer() {
		identify(this.userProvider, this.nav, this.events).then( () => {
		
			return this.rideProvider.createRide(RideType.OFFER);
		
		}).then( () => 
    this.nav.push(EditRidePage))
  }

  request() {
		identify(this.userProvider, this.nav, this.events).then( () => {
		
			return this.rideProvider.createRide(RideType.REQUEST)
		
		}).then( () => 
    this.nav.push(EditRidePage))
  }

  profile() {
		identify(this.userProvider, this.nav, this.events).then( () => 
		this.userProvider.getUser()).then( () =>
    this.nav.push(ProfilePage))
  }

	logOut() {
	
		this.userProvider.logOut()
		this.nav.popToRoot()
	
	}

}
