import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
;
import { settings } from '../../config/config'


import { Message } from 'shared/models/message'
import { User } from 'shared/models/user'
import { Ride } from 'shared/models/ride'

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MessageProvider Provider');
  }

	/*
	 *
	 * This will get the populated list of message for the current ride
	 *
	 */
	getMessages(ride: Ride) {

		// Get the messages
		return this.http.get(`${ settings.apiEndpoint }/api/rides/${ ride._id }/messages`).toPromise()
			.then((messages: Message[]) => (

				// For each message
				Promise.all(messages.map((message: Message) => 

					// Populate the author
					this.http.get(`${ settings.apiEndpoint }${ message.author['@id'] }`).toPromise()
						.then((user: User) => ( message.author = user, message ))
				
				))  

			))
	
	}

	/*
	 *
	 * This will post a message
	 *
	 */
	postMessage(message: Message, ride: Ride) {

		console.log(`message`)
		console.log(message)
	
		return this.http.post(`${ settings.apiEndpoint }/api/rides/${ ride._id }/messages`, 
			{ message: message } )
			.toPromise()
			.then((ans) => 'OK')
			.catch((error: any) => {

				console.error(`Couldn't post message`)
			  console.error(error)  

				return 'NOT_OK';

			})
	
	}

}
