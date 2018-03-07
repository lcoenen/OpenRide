import { User } from './user';
import { Link } from './link';

import { Feature, Point } from 'geojson' ;

export interface Ride {
  _id?: string;
  origin: Feature<Point>;
  destination: Feature<Point>;
  riding_time: string;
  payement?: number;
  driver?: Link;
  riders: Link[];
};
