
import { Link } from './link';

export interface User {
  _id?: string;
	name: string;
	login: string;
	password: string; //	SHA encrypted
  age: number;
  place_of_origin: string;
  reputation: number;
	rides?: Link[];
	email: string;
}

export interface Credentials {

	login: string;
	password: string;
	rememberme?: boolean;

}
