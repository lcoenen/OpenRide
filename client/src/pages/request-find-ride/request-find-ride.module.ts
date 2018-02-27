import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestFindRidePage } from './request-find-ride';

@NgModule({
  declarations: [
    RequestFindRidePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestFindRidePage),
  ],
})
export class RequestFindRidePageModule {}
