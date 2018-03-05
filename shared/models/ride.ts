import { User } from './user';
import { Link } from './link';
import { Place } from './place';

export interface Ride {
  id?: string;
  origin: Place;
  destination: Place;
  riding_time: string;
  payement?: number;
  driver?: Link;
  riders: Link[];
}

