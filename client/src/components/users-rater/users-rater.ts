import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'shared/models/user'

/*
 *
 * This will be used to rate each user after the ride
 *
 */
@Component({
  selector: 'users-rater',
  templateUrl: 'users-rater.html'
})
export class UsersRaterComponent {

	/*
	 *
	 * This will be the list of user to rate
	 *
	 */
	@Input() users: User[];

	/*
	 *
	 * This will be an indice
	 *
	 */
	i: number = 0;

	/*
	 *
	 * This will tell all the users have been rated
	 *
	 */
	@Input() rated: boolean = false;
	@Output() ratedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

  }

	ionViewDidLoad() {

	}

	/*
	 *
	 * This will show the next user
	 *
	 */
	next() {

		this.i++;

		if(this.i == this.users.length) {
			
			this.rated = true;

		}
	
	}

	/*
	 *
	 * This will reset the view
	 *
	 */
	reset() {
	
		this.rated = false;
	
	}

	/*
	 *
	 * This will return the current user
	 *
	 */
	get user() : User {
	
		if(this.users === undefined) return undefined;
		return this.users[this.i];

	}

}
