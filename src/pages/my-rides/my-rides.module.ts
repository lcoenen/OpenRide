import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRidesPage } from './my-rides';

@NgModule({
  declarations: [
    MyRidesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRidesPage),
  ],
})
export class MyRidesPageModule {}
