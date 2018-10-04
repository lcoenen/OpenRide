import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRidePage } from './edit-ride';

@NgModule({
  declarations: [
    EditRidePage,
  ],
  imports: [
    IonicPageModule.forChild(EditRidePage),
  ]
})
export class EditRidePageModule {}
