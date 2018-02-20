import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RequestRidePage } from '../pages/requestride/requestride';
import { OfferRidePage } from '../pages/offerride/offerride';
import { AddressModalPage} from '../pages/address-modal/address-modal'
import { OfferInvitePage } from '../pages/offer-invite/offer-invite'
import { RideBoardPage } from '../pages/ride-board/ride-board'
import { RequestFindRidePage } from '../pages/request-find-ride/request-find-ride'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RequestRidePage,
    OfferRidePage,
    AddressModalPage, 
    OfferInvitePage,
    RideBoardPage,
    RequestFindRidePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequestRidePage,
    OfferRidePage,
    ListPage,
    AddressModalPage,
    OfferInvitePage,
    RideBoardPage,
    RequestFindRidePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
