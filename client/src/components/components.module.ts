import { NgModule } from '@angular/core';
import { RideWidgetComponent } from './ride-widget/ride-widget';
import { PlaceSelectorComponent } from './place-selector/place-selector';
import { TimeSelectorComponent } from './time-selector/time-selector';
import { PayementSelectorComponent } from './payement-selector/payement-selector';
import { WizardComponent } from './wizard/wizard';
import { WizardPageComponent } from './wizard-page/wizard-page';
import { UsersRaterComponent } from './users-rater/users-rater';
import { CenteredMessageComponent } from './centered-message/centered-message';
import { CenteredMessageRowComponent } from './centered-message-row/centered-message-row';
@NgModule({
	declarations: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent,
    WizardComponent,
    WizardPageComponent,
    UsersRaterComponent,
    CenteredMessageComponent,
    CenteredMessageRowComponent],
	imports: [],
	exports: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent,
    WizardComponent,
    WizardPageComponent,
    UsersRaterComponent,
    CenteredMessageComponent,
    CenteredMessageRowComponent]
})
export class ComponentsModule {}
