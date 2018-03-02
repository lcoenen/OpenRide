import { User } from './user';
import { Link } from './link';

export interface Ride {
  id?: string;
  origin: string;
  destination: string;
  riding_time: string;
  payement?: number;
  driver?: Link;
  riders: Link[];
}

