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
	private _time: string;
	@Output() timeChange: EventEmitter<string> = new EventEmitter<string>();


	set asap(theAsap: boolean){

		if(theAsap)
			this.time = 'asap';
		else
			this.time = '';

		this.timeChange.emit(this.time);	

	}


	get asap(): boolean {

		return this.time == 'asap';

	}

	setTime(time:string) {

		this.time = time;
		this.timeChange.emit(time);	

	}

  constructor() {
	
		this._time = this.time;

  }

}
