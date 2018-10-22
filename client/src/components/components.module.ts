import { NgModule } from '@angular/core';
import { RideWidgetComponent } from './ride-widget/ride-widget';
import { PlaceSelectorComponent } from './place-selector/place-selector';
import { TimeSelectorComponent } from './time-selector/time-selector';
import { PayementSelectorComponent } from './payement-selector/payement-selector';
import { WizardComponent } from './wizard/wizard';
import { WizardPageComponent } from './wizard-page/wizard-page';
import { UsersRaterComponent } from './users-rater/users-rater';
@NgModule({
	declarations: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent,
    WizardComponent,
    WizardPageComponent,
    UsersRaterComponent],
	imports: [],
	exports: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent,
    WizardComponent,
    WizardPageComponent,
    UsersRaterComponent]
})
export class ComponentsModule {}
