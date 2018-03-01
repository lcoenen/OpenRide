import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RequestRidePage } from '../pages/requestride/requestride';
import { OfferRidePage } from '../pages/offerride/offerride';
import { AddressModalPage} from '../pages/address-modal/address-modal'
import { OfferInvitePage } from '../pages/offer-invite/offer-invite'
import { RideBoardPage } from '../pages/ride-board/ride-board'
import { RequestFindRidePage } from '../pages/request-find-ride/request-find-ride'
import { MyRidesPage } from '../pages/my-rides/my-rides'
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

import { RidersProvider } from '../providers/riders/riders';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequestRidePage,
    OfferRidePage,
    AddressModalPage, 
    OfferInvitePage,
    RideBoardPage,
    RequestFindRidePage,
    MyRidesPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequestRidePage,
    OfferRidePage,
    AddressModalPage,
    OfferInvitePage,
    RideBoardPage,
    RequestFindRidePage,
    MyRidesPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RidersProvider,
    HttpClientModule
  ]
})
export class AppModule {}
