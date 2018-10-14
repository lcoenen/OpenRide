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

	is_defined(): boolean {

		if(this.linked instanceof Array)
			return this.linked.reduce(((last: boolean, current: any) => last && (current !== undefined)), true)
		else
			return this.linked !== undefined;

	}

	ngAfterViewInit(){

		this.shown = this.is_defined()

		console.log('It it shown', this.shown)

		this.changed.emit();

	}

	ngOnChanges(){

		console.log('It it shown', this.shown)

		this.changed.emit()

	}

}
