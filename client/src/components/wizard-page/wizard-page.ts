import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

/**
 * Generated class for the WizardPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wizard-page',
  templateUrl: 'wizard-page.html'
})
export class WizardPageComponent implements OnChanges {

	@Input() linked;
	@Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

	ngOnChanges(){

		console.log('ngOnChanges have been called')

		this.changed.emit()

	}

}
