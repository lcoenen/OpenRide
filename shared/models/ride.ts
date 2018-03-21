import { User } from './user';
import { Link } from './link';

import { hash } from '../lib/hash';

import { Feature, Point } from 'geojson' ;


export interface Ride {
  _id?: string;
  origin: Feature<Point>;
  destination: Feature<Point>;
  riding_time: Date | string;
  payement?: number;
  driver?: Link | User;
	riders: Link[] | User[];
};

export function hashRide(ride: Ride) : string {

	return hash(ride.origin.properties.address, ride.destination.properties.address, 
		ride.payement, (new Date).toString());

}
