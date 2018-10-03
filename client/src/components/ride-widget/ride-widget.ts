import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Ride, RideType } from 'shared/models/ride';

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

	@Input() mine: boolean = false;
	@Input() type: string = 'match';

	/*
	 *
	 * This event is fired when the user click on "apply" or "invite"
	 *
	 */
	@Output() prospect: EventEmitter<Ride> = new EventEmitter<Ride>();

	/*
	 *
	 * This event is fired when the user want to enter the ride
	 *
	 */
	@Output() enter: EventEmitter<Ride> = new EventEmitter<Ride>();

	/*
	 *
	 * This event will be fired when the user want to add some people to the ride
	 *
	 */
	@Output() matches: EventEmitter<Ride> = new EventEmitter<Ride>();

	/*
	 *
	 * This event will be fired when the ride need to be edited 
	 *
	 */
	@Output() edit: EventEmitter<Ride> = new EventEmitter<Ride>();

	// RideType is the enum itself
	RideType: any;

  constructor() {

		this.RideType = RideType;	

  }

	ngOnChanges() {
	
		console.log(`ride:`)
		console.log(this.ride)
	
	}

	/*
	 *
	 * This is the user of the ride (the driver if it's an OFFER 
	 * and the riders[0] (the requester) if it's a request
	 *
	 */
	get user() {

		return this.ride.type == RideType.OFFER?
			this.ride.driver: this.ride.riders[0];
	
	}

}
