import { Component, Input, Output,
	EventEmitter } from '@angular/core';

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

	@Input('ride') ride: Ride;
	@Output() invite: EventEmitter<Ride> = new EventEmitter<Ride>();

  constructor() {

			

  }

	ngOnInit(){
	
		console.trace('Creating the ride-widget widget with ')
		console.trace(this.ride)

	}

	/*
	 * 
	 * This will return the rider from whom the request comes
	 * from. 
	 *
	 * This is only supposed to be used if the ride is a request
	 *
	 */
	
	get rider(){
	
		return this.ride.riders[0]	
	
	}

}
