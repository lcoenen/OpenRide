import { Component } from '@angular/core';

/**
 * Generated class for the CenteredMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'centered-message',
  templateUrl: 'centered-message.html'
})
export class CenteredMessageComponent {

  text: string;

  constructor() {
    console.log('Hello CenteredMessageComponent Component');
    this.text = 'Hello World';
  }

}
