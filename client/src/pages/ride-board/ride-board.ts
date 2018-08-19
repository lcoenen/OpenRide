import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Ride } from 'shared/models/ride.ts'
import { Message, hashMessage } from 'shared/models/message.ts'

import { RideProvider } from '../../providers/ride/ride';
import { MessageProvider } from '../../providers/message/message';
import { UserProvider } from '../../providers/user/user';

import { ProfilePage } from '../profile/profile';

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

	messageBuffer: string;
	messages: Message[];
  boardpage: string;
	currentRide: Ride;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public rideProvider: RideProvider,
		public userProvider: UserProvider,
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
	
		this.messageProvider.getMessages(this.currentRide).then((messages: Message[]) => {

			this.messages = messages;   

		})
	
	}

	/*
	 * 
	 * This will be called when the page is loaded
	 *
	 */
  ionViewDidLoad() {

		console.log(this.rideProvider.currentRide)

		this.refreshMessages()

  }


	/*
	 *
	 * This shows the profile of an user
	 *
	 */
  profile() {

    this.navCtrl.push(ProfilePage);

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

}
