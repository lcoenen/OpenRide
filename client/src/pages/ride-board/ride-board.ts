import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Ride, RideType } from 'shared/models/ride.ts'
import { User } from 'shared/models/user.ts'
import { Message, hashMessage } from 'shared/models/message.ts'

import { RideProvider, EditMode } from '../../providers/ride/ride';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { ProfilePage } from '../profile/profile';
import { MatchesPage } from '../matches/matches';
import { EditRidePage } from '../edit-ride/edit-ride';

/**
 * Generated class for the RideBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ride-board',
  templateUrl: 'ride-board.html',
})
export class RideBoardPage {

	EditMode: any = EditMode;

	messageBuffer: string;
	messages: Message[];
  boardpage: string;
	currentRide: Ride;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider,
		public userProvider: UserProvider,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public messageProvider: MessageProvider) {

    this.boardpage = 'riders';

		this.currentRide = this.rideProvider.currentRide;

		this.messages = []

  }


	/*
	 * 
	 * This will refresh the messages
	 *
	 */
	refreshMessages() {

		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		loading.present()
	
		this.messageProvider.getMessages(this.currentRide).then((messages: Message[]) => {

			loading.dismiss();

			this.messages = messages;   

		})
	
	}

	/*
	 * 
	 * This will be called when the page is loaded
	 *
	 */
  ionViewWillEnter() {

		this.currentRide = this.rideProvider.currentRide;
		this.refreshMessages()

  }

	/*
	 *
	 * This will return true if the rider is me
	 *
	 */
	me(rider: User){ 

		return this.userProvider.me._id == rider._id;

	}

	/*
	 *
	 * This shows the profile of an user
	 *
	 */
  profile(user: User) {
		
		this.userProvider.getUser(user).then( () => 
	    this.navCtrl.push(ProfilePage))

  }

	/*
	 *
	 * This will post the message in the buffer
	 *
	 */
	postMessage() {

		let to_insert: Message = {
		
			_id: '',
			ride: { '@id' : `/api/rides/${ this.currentRide._id }`},
			author: { '@id' : `/api/users/${ this.userProvider.me._id }`},
			date: (new Date),
			message: this.messageBuffer		

		} 

		to_insert._id = hashMessage(to_insert)

		this.messageProvider.postMessage(to_insert, this.currentRide).then((answer: any) => {

			if(answer == 'OK') {
			
				this.refreshMessages()			
				this.messageBuffer = '';
			
			}
			else {
			
				const toast = this.toastCtrl.create({
					message: 'Something went wrong :(',
					duration: 3000
				});
				toast.present();
			
			}

		});

	}


	/*
	 * 
	 * This will tell if a ride is owned by the user
	 *
	 */
	mine(ride: Ride) {

		let owner: User = <User>(ride.type == RideType.OFFER?
			ride.driver: ride.riders[0]);

		console.log('owner is', owner)

		return owner._id == this.userProvider.me._id;

	}

	/*
	 *
	 * This will open the matches page
	 *
	 */
	matches(ride: Ride){ 

		this.rideProvider.currentRide = ride;
		this.navCtrl.push(MatchesPage);

	}

	/*
	 *
	 * This will be called when the user want to edit a ride
	 *
	 */
	edit_ride() {

		this.rideProvider.editRide(this.rideProvider.currentRide);
		this.navCtrl.push(EditRidePage);

	}

}
