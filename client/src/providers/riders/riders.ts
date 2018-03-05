import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rider } from 'shared/models/rider'
import { RidersMock } from 'shared/mocks/rider';

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
  invitable_riders(): Rider[] {

    console.log('Trying the API call');
/*
    this.httpClient.get('localhost:3000/api/ping').subscribe( data => {

      console.log('Answer from the API', data);

    }); 
*/
    console.log('Fetching invitable riders');
    return RidersMock;

  }

  /*
    Used when a rider request a ride, to show him matches
  */
  request_find_ride(): Rider[] {

    console.log('Fetching invitable riders');
    return RidersMock;

  }

  /*
      
  */
}
