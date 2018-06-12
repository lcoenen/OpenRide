import { Component } from '@angular/core';

/**
 * Generated class for the RideWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ride-widget',
  templateUrl: 'ride-widget.html'
})
export class RideWidgetComponent {

  text: string;

  constructor() {
    console.log('Hello RideWidgetComponent Component');
    this.text = 'Hello World';
  }

}
