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

  invitable_riders(): Rider[] {

    console.log('Fetching invitable riders');
    return RidersMock;


  }

}
