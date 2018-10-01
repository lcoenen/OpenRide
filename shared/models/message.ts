import { User } from './user';
import { Link } from './link';

import { hash } from '../lib/hash';

export interface Message {
  _id?: string;
	ride: Link;
  message: string;
  author: Link | User;
  date: Date;
}

export function isMessage(x: any) : x is Message {

	console.log('trying to validate')
	console.log(x)

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

export function hashMessage(message: Message) : string {

	return hash(message.message, message.author, (new Date).toString()).substr(0,6)

}

