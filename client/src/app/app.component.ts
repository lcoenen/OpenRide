import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EditRidePage } from '../pages/edit-ride/edit-ride';
import { MyRidesPage } from '../pages/my-rides/my-rides'
import { ProfilePage } from '../pages/profile/profile'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  home() {
    this.nav.setRoot(HomePage);
  }

  myRides() {
    this.nav.setRoot(MyRidesPage);
  }

  offer() {
    this.nav.setRoot(EditRidePage);
  }

  request() {
    this.nav.setRoot(EditRidePage);
  }

  profile() {
    this.nav.setRoot(ProfilePage);
  }
}
