/*
 *
 *	This is an user. The interface will be used all along
 *	the infoline, from the client to Mongo.
 *
 *	The ID is computed by the userProvider in the client. 
 *	It is a SHA hash of the user itself. It's also the representation
 *	of the user in Mongo and the RESTAPI.
 *
 */
export interface User {
  _id?: string;
	name: string;
	password?: string; //	SHA encrypted
  age: number;
  place_of_origin: string;
  reputation: number;
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

/*
 *
 *	This is the credentials used to login.
 *	It is produced by the identify-login view in the client
 *	and consumed by the PUT /api/session/me route of the server.
 *
 */
export interface Credentials {

	login: string;
	password: string;
	rememberme?: boolean;

}

export type Signature = string;

/*
 *
 *	This is the response the Server will give to
 *	a signup request (i.e. the PUT /api/users/XXX route
 *
 */
export interface SignupResponse {

	key: Signature;
	user: User;
	message: string;
	

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
