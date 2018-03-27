import { User } from './user';
import { Link } from './link';

import { hash } from '../lib/hash';

import { Feature, Point } from 'geojson' ;

export enum RideType {
	REQUEST,
	OFFER
}

export interface Ride {
  _id?: string;
  origin: Feature<Point>;
  destination: Feature<Point>;
  riding_time: Date | string;
  payement?: number;
  driver?: Link | User;
	riders: Link[] | User[];
	type: RideType;
};

export function isRide(x: any) : x is Ride {

	return [
		x.origin, 
		x.destination,
		x.riding_time,
		x.type
	].filter((x:any) => {

	  return x == undefined;  

	}).length == 0;

}

export function hashRide(ride: Ride) : string {

	return hash(ride.origin.properties.address, ride.destination.properties.address, 
		ride.payement, (new Date).toString());

}
