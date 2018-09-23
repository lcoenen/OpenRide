import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditRidePage } from '../pages/edit-ride/edit-ride';
import { AddressModalPage} from '../pages/address-modal/address-modal'
import { MatchesPage } from '../pages/matches/matches'
import { RideBoardPage } from '../pages/ride-board/ride-board'
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

import { PayementSelectorComponent } from '../components/payement-selector/payement-selector' 
import { PlaceSelectorComponent } from '../components/place-selector/place-selector'
import { TimeSelectorComponent } from '../components/time-selector/time-selector'
import { RideWidgetComponent } from '../components/ride-widget/ride-widget' 
import { WizardComponent } from '../components/wizard/wizard' 
import { WizardPageComponent } from '../components/wizard-page/wizard-page' 

import { Slides } from 'ionic-angular';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AutoCompleteModule } from 'ionic2-auto-complete';
import { MessageProvider } from '../providers/message/message';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		EditRidePage,
		AddressModalPage, 
		MatchesPage,
		RideBoardPage,
		MyRidesPage,
		ProfilePage,
		IdentifyPage,
		IdentifyLoginPage,
		IdentifySignupPage,
		RideWidgetComponent,
		PlaceSelectorComponent,
		TimeSelectorComponent,
		PayementSelectorComponent,
		WizardComponent,
		WizardPageComponent
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
		EditRidePage,
		AddressModalPage,
		MatchesPage,
		RideBoardPage,
		MyRidesPage,
		ProfilePage,
		IdentifyPage,
		IdentifyLoginPage,
		IdentifySignupPage,
		RideWidgetComponent,
		PlaceSelectorComponent,
		TimeSelectorComponent,
		PayementSelectorComponent,
		WizardComponent,
		WizardPageComponent
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
