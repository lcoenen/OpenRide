
import { Link } from './link';

export interface User {
  _id?: string;
	name: string;
	password?: string; //	SHA encrypted
  age: number;
  place_of_origin: string;
  reputation: number;
	rides?: Link[];
	email: string;
}

export function isUser(x: any) : x is User {

	return [x.name,
		x._id,
		x.age,
		x.place_of_origin,
		x.reputation,
		x.email].filter((x:any) => {

		  return x == undefined  

		}).length == 0;

}

export interface Credentials {

	login: string;
	password: string;
	rememberme?: boolean;

}

export function isCredentials (x: any) : x is Credentials {

	return [x.login, x.password].filter((x: any) => {

	   return x == undefined; 

	}).length == 0;

}

export function sanitize (user: User): User {

	let newUser: User = {...user};
	delete newUser.password;
	return newUser;

}
