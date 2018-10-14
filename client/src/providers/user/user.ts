import * as sha256 from 'sha256';

import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'

import { User, Credentials, SignupResponse, Signature } from 'shared/models/user';

import { settings } from '../../config/config'

import { EditMode } from '../ride/ride';

const KEY_NAME = "openride-server-session";

	/*
	 * 
	 * This is the interceptor. It will add the key to every outbound
	 * http request to the server
	 *
	 */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	static _key: Signature;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		console.log("intercepted request ... ");
		console.log(`request key: ${ ApiKeyInterceptor._key } `)

		// Clone the request to add the new header.
		const authReq = ApiKeyInterceptor._key?
		req.clone({ headers: req.headers.set(KEY_NAME, ApiKeyInterceptor._key) }) :
		req;

		return next.handle(authReq)

	}

}


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

	constructor(public http: HttpClient) {
		console.log('Hello UsersProvider Provider');
	}

	public currentUser: User;
	public originalUser: User;

/*
 *
 * 	This define if the user is created or edited
 *
 */
	public mode: EditMode;

/*
 *
 *	This will get an user
 *
 */
	getUser(path?: string) {

		if(path === undefined) {
			this.currentUser = this.me;
			return Promise.resolve(this.me);
		}
		else
			return this.http.get(`${ settings.apiEndpoint }${ path }`).toPromise().then( (user: User) => {

				this.currentUser = user;
				return user;

			})

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

	/*
	 *
	 * Throw an error if an user is already logged in
	 *
	 */
	if(ApiKeyInterceptor._key !== undefined) 
		throw Error('There is already an user logged in')

	// Clone user
	user = {...user};

	// Generate a hash of the password
	user.password = sha256(user.password);

	// Generate an _id from the hash of the user object
	user._id = sha256(JSON.stringify(user)).substring(0,9)

	return this.http.post(`${ settings.apiEndpoint }/api/users`,
		{user: user}).toPromise().then((response: SignupResponse) => {

			// Saving the recieved user and the key

			Cookie.set(KEY_NAME, response.key);
			ApiKeyInterceptor._key = response.key;
			this._me = response.user;

			return response.user;

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


	/*
	 *
	 * Throw an error if an user is already logged in
	 *
	 */
	if(ApiKeyInterceptor._key !== undefined) 
		throw Error('There is already an user logged in')

	credentials = {...credentials}
	credentials.password = sha256(credentials.password);

	return this.http.put(`${ settings.apiEndpoint }/api/session/me`, credentials).toPromise().then((response: any) => {

		this._me = response.user;
		ApiKeyInterceptor._key = response.key;
		Cookie.set(KEY_NAME, response.key);

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
 * This will check if a cookie exists and retrieve the user if it's the case
 *
 */
 public checkCookie() : Promise<any>{

	console.log('Checking for cookies.')

	// Retrieve the cookie

	let key = Cookie.get(KEY_NAME);	

	console.log('key: ', key);

	// If there's no cookie, return a failed promise
	if(key === null) 
		return Promise.reject('There is no session cookie')	

	// If there's a cookie, retrieve the user
	ApiKeyInterceptor._key = key;	

	return this.http.get(`${ settings.apiEndpoint }/api/session/me`).toPromise().then((response: any) => {

		this._me = response.user;
		return this._me;

	}).catch((error) => { 

		console.log('The server answered the key is invalid')
		ApiKeyInterceptor._key = undefined;

		throw error;

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

	ApiKeyInterceptor._key = undefined;

}

/*
 *
 * 	This will prepare an user edition
 *
 */
public startUserEdition(user?: User) {

	if(user !== undefined) this.originalUser = { ... user }

	this.mode = (user === undefined)? EditMode.CREATE : EditMode.EDIT;

	if(user === undefined) 
		user = {
			name: undefined,
			age: undefined,
			place_of_origin: undefined,
			reputation: 0,
			email: undefined,
			password: undefined,
			presentation: undefined,
			vehicle: undefined,
			charge_per_km: undefined
		}

	this.currentUser = user;

}

public newUser() {

	this.startUserEdition(undefined)
	this.mode = EditMode.CREATE; 

}

/*
 *
 *	This will attempt to edit an user
 *
 */
public editUser(user: User) {

	this.currentUser = user;

	return this.http.put(`${ settings.apiEndpoint }/api/users/${ user._id }`,
		{updatedUser: user}).toPromise().catch((err: any) => {

			console.error(err);

		});
			
}

/*
 *
 *	This will discard the changes
 *
 */
public discard() {

	this.currentUser = this.originalUser;

}

}

export { EditMode };
