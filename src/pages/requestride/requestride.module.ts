import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestRidePage } from './requestride';

import { AddressModalPage } from '../address-modal/address-modal';

@NgModule({
  declarations: [
    RequestRidePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestRidePage),
  ]
})
export class RequestRidePageModule {}
