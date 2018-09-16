import { Component, Input, EventEmitter } from '@angular/core';

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
export class WizardPageComponent {

	@Input() linked;
	public changed: EventEmitter<boolean>;

  constructor() {
  }

	ngOnChanges(){

		this.changed.emit()

	}

}
