import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRidePage } from './editride';

import { AddressModalPage } from '../address-modal/address-modal';

@NgModule({
  declarations: [
    EditRidePage,
  ],
  imports: [
    IonicPageModule.forChild(EditRidePage),
  ]
})
export class EditRidePageModule {}
