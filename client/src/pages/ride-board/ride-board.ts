import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ride } from 'shared/models/ride.ts'
import { Message } from 'shared/models/message.ts'

import { RideProvider } from '../../providers/ride/ride';
import { MessageProvider } from '../../providers/message/message';

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
		public messageProvider: MessageProvider) {

    this.boardpage = 'riders';

		this.currentRide = this.rideProvider.currentRide;

  }

  ionViewDidLoad() {

		console.log(this.rideProvider.currentRide)


		this.messageProvider.getMessages(this.currentRide).then((messages: Message[]) => {

		 	this.messages = messages;   

		})

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


	
	}

}
