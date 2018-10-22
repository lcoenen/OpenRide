import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController, ModalController } from 'ionic-angular';

import { Ride, RideType } from 'shared/models/ride.ts'
import { User } from 'shared/models/user.ts'
import { Message, hashMessage } from 'shared/models/message.ts'

import { RideProvider, EditMode } from '../../providers/ride/ride';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { ProfilePage } from '../profile/profile';
import { MatchesPage } from '../matches/matches';
import { EditRidePage } from '../edit-ride/edit-ride';
import { ConfirmConfirmationPage } from '../confirm-confirmation/confirm-confirmation';
import { ConfirmFinalizePage } from '../confirm-finalize/confirm-finalize';

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

	/*
	 *
	 * This will store the message before it is send
	 *
	 */
	messageBuffer: string;

	/*
	 *
	 * These are the messages sent to the ride channel
	 *
	 */
	messages: Message[];

	
	/*
	 *
	 * This is the selected page
	 *
	 */
  boardpage: string;
	
	/*
	 *
	 * This is the current loaded ride
	 *
	 */
	ride: Ride;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider,
		public userProvider: UserProvider,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public modalCtrl: ModalController,
		public messageProvider: MessageProvider) {

    this.boardpage = 'riders';

		this.ride = this.rideProvider.currentRide;

		this.messages = []

  }


	/*
	 * 
	 * This will refresh the view
	 *
	 */
	refresh() {

		this.ride = this.rideProvider.currentRide;

		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		loading.present()
	
		this.messageProvider.getMessages(this.ride).then((messages: Message[]) => {

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

		this.refresh();

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
			ride: { '@id' : `/api/rides/${ this.ride._id }`},
			author: { '@id' : `/api/users/${ this.userProvider.me._id }`},
			date: (new Date),
			message: this.messageBuffer		

		} 

		to_insert._id = hashMessage(to_insert)

		this.messageProvider.postMessage(to_insert, this.ride).then((answer: any) => {

			if(answer == 'OK') {
			
				this.refresh()			
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

		this.rideProvider.startRideEdition(this.rideProvider.currentRide);
		this.navCtrl.push(EditRidePage);

	}

	/*
	 *
	 *	This will show the confirm-confirmation modal.
	 *
	 *	It means that the originator of the ride want to confirm it
	 *
	 */
	confirm(ride: Ride) {

		let confirm_modal = this.modalCtrl.create(ConfirmConfirmationPage);
		confirm_modal.onDidDismiss((confirm: boolean) => {

			this.rideProvider.confirm(ride)	

		})
		confirm_modal.present()

	}

	/*
	 *
	 * This will make the user leave the ride
	 *
	 */
	depart(user: User = this.userProvider.me) {
	
		this.rideProvider.depart(this.ride, user).then( () => {
		
			if(user == this.userProvider.me) 
				this.navCtrl.pop()	
			else {
			
				let riders: User[] = <User[]>this.ride.riders;
				riders.splice(riders.indexOf(user), 1)

			}

		})

	}

	/*
	 *
	 * This means the user want to cancel the ride
	 *
	 */
	cancel() {
	
		this.rideProvider.cancel(this.ride).then( () => {
		
			this.navCtrl.pop();	
		
		})
	
	}	

	/*
	 *
	 * This will tell if the ride is in the past
	 *
	 */
	finalizable(ride: Ride) {
	
		return ride.confirmed && 
			(ride.riding_time == 'asap' ? true :
				new Date(ride.riding_time) > new Date())
	
	}

	/*
	 *
	 * This will be called when the user want to finalize a ride
	 *
	 */
	finalize(ride: Ride) {
	
		let finalize_modal = this.modalCtrl.create(ConfirmFinalizePage);

		finalize_modal.onDidDismiss((confirm: boolean) => {

			this.rideProvider.finalize(ride)	

		});

		finalize_modal.present()
	
	}

}
