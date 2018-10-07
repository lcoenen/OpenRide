import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the MessageWhenEmptyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-when-empty',
  templateUrl: 'message-when-empty.html'
})
export class MessageWhenEmptyComponent {

	@Input('showContinue') showContinue: boolean = false;
	@Output() continue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

}
