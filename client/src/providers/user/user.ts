import * as sha256 from 'sha256';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, Credentials, SignupResponse } from 'shared/models/user';

import { settings } from '../../config/config'


/*
 *
 *	This provider is the interface between the pages and component and the RESTAPI
 *
 *	It handles the session and is the one that will intercept every API request to add the session key
 *
 */
@Injectable()
export class UserProvider {

	private _me: User;
	private _key: string;

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

	/*
	 *
	 *	This getter will be used to get the logged in user
	 *
	 *	It's a readonly and can be undefined if the user is not connected yet
	 *
	 */
	get me( ) {
		
		return this._me;	

	}

	/*
	 *
	 *	This function will be used to know if the username is free
	 *
	 *	It will issue a HEAD request to the server /api/users/XXX entrypoint to know if the ressource exists
	 *
	 */
	public usernameExists(username: string)  {
		
		

	}

	/*
	 *
	 *	This function will be used to sign the user up
	 *
	 *	It will PUT the user to /api/session/me
	 *
	 */
	public signup(user: User) {

		// Clone user
		user = {...user};

		// Generate a hash of the password
		user.password = sha256(user.password);

		// Generate an _id from the hash of the user object
		user._id = sha256(JSON.stringify(user)).substring(0,9)
		
		return this.http.put(`${ settings.apiEndpoint }/api/users/${ user._id }`,
			{user: user}).toPromise().then((ans: SignupResponse) => {

				// Saving the recieved user and the key
				
				this._key = ans.key;
				this._me = ans.user;

				return ans.user;

		}).catch((error:any) => {

			// If it's unauthorised, that means the user already exists
		 	if(error.status == 401 && error.error.code == 'DUPLICATE') 
				throw 'DUPLICATE'
			else console.error(error);
			throw error;

		})

	}

	/*
	 *
	 *	This function will attempt to login the user.
	 *
	 *	If the attempt is successful, this.me() will answer the connected user.
	 *	All outbound API call will be issued with the key
	 *
	 */
	public login(credentials: Credentials)  {

		credentials = {...credentials}
		credentials.password = sha256(credentials.password);

		return this.http.put(`${ settings.apiEndpoint }/api/session/me`, credentials).toPromise().then((response: any) => {

			return response.user;

		}).catch((err) => {

			/*
			 *
			 * These status error will be translated into string 
			 * and caught by the identify-login component
			 *
			 */
			if(err.status == 404) throw 'UNKNOWN_USER';
			else if(err.status == 401) throw 'BAD_PASSWORD';
			throw err

		});

	}

	/*
	 *
	 *	This function will logout the user
	 *
	 *	It will issue a DELETE request on /api/session/me
	 *
	 */
	public logout( ) {
		
		

	}

}
