import { Component } from '@angular/core';

/**
 * Generated class for the CenteredMessageRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'centered-message-row',
  templateUrl: 'centered-message-row.html'
})
export class CenteredMessageRowComponent {

  text: string;

  constructor() {
    console.log('Hello CenteredMessageRowComponent Component');
    this.text = 'Hello World';
  }

}
