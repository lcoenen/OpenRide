import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ride } from 'shared/models/ride'
import { RidesMock } from 'shared/mocks/ride';

/*
  Generated class for the RidersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RidersProvider {

  constructor(public httpClient: HttpClient) {
    console.log('Hello RidersProvider Provider');
  }

  /*
    Used when a driver is offering a ride, to invite riders
  */
  invitable_riders(): Ride[] {

    console.log('Trying the API call');
/*
    this.httpClient.get('localhost:3000/api/ping').subscribe( data => {

      console.log('Answer from the API', data);

    }); 
*/
    console.log('Fetching invitable riders');
    return RidesMock;

  }

  /*
    Used when a rider request a ride, to show him matches
  */
  request_find_ride(): Ride[] {

    console.log('Fetching invitable riders');
    return RidesMock;

  }

  /*
  	Offer a ride
	*/
	offer_ride(ride: Ride) {

		console.log(`Provider: recieved a ride ${ ride }`)

	}

}
