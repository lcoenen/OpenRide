import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferRidePage } from './offerride';

import { AddressModalPage } from '../address-modal/address-modal';

@NgModule({
  declarations: [
    OfferRidePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferRidePage),
  ]
})
export class OfferRidePageModule {}
