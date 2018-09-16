import { NgModule } from '@angular/core';
import { RideWidgetComponent } from './ride-widget/ride-widget';
import { PlaceSelectorComponent } from './place-selector/place-selector';
import { TimeSelectorComponent } from './time-selector/time-selector';
import { PayementSelectorComponent } from './payement-selector/payement-selector';
@NgModule({
	declarations: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent],
	imports: [],
	exports: [RideWidgetComponent,
    PlaceSelectorComponent,
    TimeSelectorComponent,
    PayementSelectorComponent]
})
export class ComponentsModule {}
