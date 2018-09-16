import { User } from './user';
import { Link } from './link';
import { Prospect } from './prospect';

import { hash } from '../lib/hash';

import { Feature, Point } from 'geojson' ;

export enum RideType {
	REQUEST,
	OFFER
}

/*
 *
 * This represent a Ride. 
 * 
 * A ride can be either a request or an offer
 * If it's a request, riders will be an array with exactly one User and
 * no driver. If it's an offer, the driver will be the owner of the ride.
 *
 * The type property (see RideType) can be either REQUEST or OFFER
 *
 */
export interface Ride {
  _id?: string;
  origin?: Feature<Point>;
  destination?: Feature<Point>;
  riding_time?: Date | string;
  payement?: number;
  driver?: Link | User;
	riders: Link[] | User[];
	prospect?: Prospect; 
	type: RideType;
};

/*
 *
 * This will represent the different payement philosophy
 *
 */
export enum PayementPhilosophy {

	FREE,
	PART,
 	REFUNDED, 
	PAID

}

/*
 *
 * These represents the rides type shown in the MyRides page
 *
 */
export interface MyRides{


	/*
	 *
	 * This will represent all the rides I'm in. This will only be 
	 * OFFERs. I can be the driver or a rider.
	 *
	 */
  myRides: Ride[];

	/*
	 *
	 * This will be my requests.
	 *
	 */
	myRequests: Ride[];

	/*
	 *
	 * This will be all my prospects (the rides I applied, the ones I've been invited to,
	 * the ones I invited and the ones I've been applied from
	 *
	 * See shared/models/prospect.ts
	 *
	 */
	myProspects: Ride[]

}

/*
 *
 * This function is a typeguard to check if it's a ride
 *
 */
export function isRide(x: any) : x is Ride {

	let is_ride: boolean = [
		x.origin, 
		x.destination,
		x.riding_time,
		x.type
	].filter((x:any) => {

	  return x == undefined;  

	}).length == 0;

	return is_ride;

}

/*
 *
 * Hash a ride. 
 *
 * This function will return an unique string for the ride. 
 * It is used to compute an ID for the ride inside MongoDB
 *
 */
export function hashRide(ride: Ride) : string {

	return hash(ride.origin.properties.address, ride.destination.properties.address, 
		ride.payement, (new Date).toString()).substr(0,6);

}
