import { User } from './user';
import { Link } from './link';

import { hash } from '../lib/hash';

import { Feature, Point } from 'geojson' ;


export interface Ride {
  _id?: string;
  origin: Feature<Point>;
  destination: Feature<Point>;
  riding_time: Date;
  payement?: number;
  driver?: Link;
  riders: Link[];
};

export function hashRide(ride: Ride) : string {

	return hash(ride.origin.properties.address, ride.destination.properties.address, 
		ride.payement, (Date.now()));

}
