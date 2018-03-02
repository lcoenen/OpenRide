
import { Link } from './link';

export interface User {
  id?: string;
  name: string;
  age: number;
  place_of_origin: string;
  reputation: number;
  rides: Link[];
}

