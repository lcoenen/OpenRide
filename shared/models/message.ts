import { User } from './user';
import { Link } from './link';

export interface Message {
  _id?: string;
	ride: Link;
  message: string;
  author: Link;
  date: number;
}

