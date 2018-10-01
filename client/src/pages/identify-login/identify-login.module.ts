import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentifyLoginPage } from './identify-login';

@NgModule({
  declarations: [
    IdentifyLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentifyLoginPage),
  ],
})
export class IdentifyLoginPageModule {}
