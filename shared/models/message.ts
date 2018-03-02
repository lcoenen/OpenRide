import { User } from './user';
import { Link } from './link';

export interface Message {
  id?: string;
  message: string;
  author: Link;
  date: number;
}

