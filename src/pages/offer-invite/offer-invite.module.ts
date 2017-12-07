import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferInvitePage } from './offer-invite';

@NgModule({
  declarations: [
    OfferInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferInvitePage),
  ],
})
export class OfferInvitePageModule {}
