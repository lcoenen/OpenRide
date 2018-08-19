import { User } from './user';
import { Link } from './link';

export interface Message {
  _id?: string;
	ride: Link;
  message: string;
  author: Link | User;
  date: number;
}

export function isMessage(x: any) : x is Message {

	let is_message: boolean = [
		x.ride, 
		x.author,
		x.message,
		x.date
	].filter((x:any) => {

	  return x == undefined;  

	}).length == 0;

	return is_message;


}

