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

	public shown: boolean = true;
	@Input() linked: any;
	@Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

	ngAfterViewInit(){

		if(this.linked instanceof Array)
			this.shown = this.linked.reduce((last: boolean, current: any) => last && current !== undefined)
		else
			this.shown = this.linked !== undefined;
		this.changed.emit();

	}

	ngOnChanges(){

		this.changed.emit()

	}

}
