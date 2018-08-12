import { Component, Input } from '@angular/core';

import { Ride } from 'shared/models/ride';

/*
 *
 * This is the ride-widget component.
 *
 * It shows a card representing a ride. It is used by the offer-invite, request-find-ride
 * and my-rides pages.
 *
 * It shows the right information wether the ride is a request or an offer
 *
 * See /shared/models/ride.ts
 *
 */
@Component({
  selector: 'ride-widget',
  templateUrl: 'ride-widget.html'
})
export class RideWidgetComponent {

	@Input() ride: Ride;

  constructor() {

		

  }

	ngOnChanges() {
	
		console.log(`ride:`)
		console.log(this.ride)
	
	}

}
