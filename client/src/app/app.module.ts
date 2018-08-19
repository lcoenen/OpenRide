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
import { IdentifyPage } from '../pages/identify/identify'

import { IdentifyLoginPage } from '../pages/identify-login/identify-login'
import { IdentifySignupPage } from '../pages/identify-signup/identify-signup'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RideProvider } from '../providers/ride/ride';
import { UserProvider, ApiKeyInterceptor } from '../providers/user/user';
import { NominatimProvider } from '../providers/nominatim/nominatim';

import { RideWidgetComponent } from '../components/ride-widget/ride-widget' 


import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AutoCompleteModule } from 'ionic2-auto-complete';
import { MessageProvider } from '../providers/message/message';

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
		ProfilePage,
		IdentifyPage,
		IdentifyLoginPage,
		IdentifySignupPage,
		RideWidgetComponent
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule,
		LeafletModule,
		AutoCompleteModule
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
		ProfilePage,
		IdentifyPage,
		IdentifyLoginPage,
		IdentifySignupPage,
		RideWidgetComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		RideProvider,
		UserProvider,
		NominatimProvider,
		HttpClientModule,
		{ 
			provide: HTTP_INTERCEPTORS, 
			useClass: ApiKeyInterceptor, 
			multi: true 
		},
    MessageProvider 
	]
})
export class AppModule {}
