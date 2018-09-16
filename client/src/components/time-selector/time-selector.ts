import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the TimeSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'time-selector',
  templateUrl: 'time-selector.html'
})
export class TimeSelectorComponent {

	@Input() time: string;	
	@Output() timeChange: EventEmitter<string>;


	set asap(theAsap: boolean){

		if(theAsap)
			this.time = 'asap';
		else
			this.time = '';

	}


	get asap(): boolean {

		return this.time == 'asap';

	}


  constructor() {
    console.log('Hello TimeSelectorComponent Component');
  }

}
