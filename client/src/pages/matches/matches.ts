import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Ride, RideType } from 'shared/models/ride';
import { Prospect } from 'shared/models/prospect';
import { Link } from 'shared/models/link';

import { RideBoardPage } from '../ride-board/ride-board'; 
import { MyRidesPage } from '../my-rides/my-rides';

import { RideProvider } from '../../providers/ride/ride';

/**
 * Generated class for the OfferInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

	/*
	 *
	 * This is rides that the riders are looking for
	 *
	 */
  public rides: Ride[];

	/*
	 *
	 * This will store the prospects associated with the current ride
	 *
	 */
	public prospects: Prospect[];

	public type: RideType;
	public RideType: any = RideType;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
    public rideProvider: RideProvider) {

	}

	refresh() {

		this.type = this.rideProvider.currentRide.type;

		/*
		 *
		 * Subscribe to a stream of ride from rideProviders
		 *
		 */
	  let loading = this.loadingCtrl.create({
	    content: 'Please wait...'
	  });

		loading.present()

		return this.rideProvider.prospects(this.rideProvider.currentRide)
		.then( (prospects: Prospect[]) => {

			this.prospects = prospects;
			
		}).then(() => this.rideProvider.matches()).then((rides: Ride[]) => {

			rides = rides.map( (ride: Ride) => {

				let filteredProspect: Prospect[] = this.prospects.filter( (prospect) =>
					(<Link>prospect.with)['@id'] == `/api/rides/${ride._id}` || 
					(<Link>prospect.ride)['@id'] == `/api/rides/${ride._id}` 
				)

				if(filteredProspect.length != 0) 
					ride.prospect = filteredProspect[0];

				return ride;

			})
			
			this.rides = rides;  
			loading.dismiss()

		})

  }

  ionViewWillEnter() {
		
		this.refresh()

  }

	/* 
	 *
	 * This redirect to the ride board
	 *
	 */
  continue() {

		if(this.rideProvider.currentRide.type == RideType.OFFER) 
			this.navCtrl.push(RideBoardPage);
		else
			this.navCtrl.push(MyRidesPage);
  
  }

	/*
	 *
	 *	This will tell if a ride have been prospected or not
	 *
	 */
	prospected(ride: Ride) {

		return this.prospects.filter((prospect: Prospect) => {

			return (<Link>prospect.ride)['@id'] == `/api/rides/${ ride._id }`;	

		}).length != 0

	}

	/*
	 *
	 *	This will tell if a ride require action
	 *
	 */
	requireAction(ride: Ride) {

		return this.prospects.filter((prospect: Prospect) => {

			return (<Link>prospect.with)['@id'] == `/api/rides/${ ride._id }`;	

		}).length == 0

	}

	/*
	 * 
	 * This means the user is inviting a ride request
	 *
	 */
	invite(invitedRide: Ride) {

		if(this.requireAction(invitedRide))	
			this.rideProvider.invite(invitedRide).then((answer) => {

				const toast = this.toastCtrl.create({
					message: 'Invite sent', 
					duration: 3000
				})
				toast.present();
				
				this.refresh()	

			})
		else {

			console.log('Trying to join', invitedRide)
			this.rideProvider.join(invitedRide).then( (ride) => {

				let message = this.type == RideType.OFFER? 
					'This user have joined the ride' :
					'You have joined this ride';

				const toast = this.toastCtrl.create({
					message: message, 
					duration: 3000
				})
				toast.present();
				this.refresh();

			})
		}
	
	}

}
