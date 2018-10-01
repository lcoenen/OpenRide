import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideBoardPage } from './ride-board';

@NgModule({
  declarations: [
    RideBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(RideBoardPage),
  ],
})
export class RideBoardPageModule {}
