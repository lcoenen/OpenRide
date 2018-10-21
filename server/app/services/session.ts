import * as redis from 'redis';
import * as restify from 'restify';

import * as cat from 'catnapify';

import { Promise } from 'es6-promise'

import { Link } from 'shared/models/link';
import { User, Signature, Credentials } from 'shared/models/user';

import { db } from '../services/db';
import { logger } from '../services/logger';
import { settings } from '../config/config';

import { hash } from 'shared/lib/hash';

export const salt = '5ce5be34c720d80d9d0075bccb47e7e56db9d36c';


export const keyName = `${ settings.name }-session`

let redis_client = redis.createClient()

//export interface cat.Request{ user : User };

export interface sessionRequest extends cat.Request {

	user: User;
	key: Signature;

}


export namespace session {

	// export let loggedInUser: Link = { '@id': '/api/users/Louise' }	

	/*
	 *
	 * Return a token that have to be sent to the client.
	 *
	 * Register the tokens inside redis under the form
	 * SET keys:<client_key> JSON.stringify(user)
	 *
	 */
	export function authentify (user: User): Promise<Signature> {

		return new Promise((resolve, reject) => {

			let first_hash: string = hash(`${ salt }user ${ user._id } / ${ user.password } ${ (new Date()).toString() }`)
			let client_key = hash(first_hash.substr(0,20))		

			/*
			 *
			 * Set a pair inside the `keys` dictionary.
			 * The key is a string, the value is the stringified user
			 *
			 */
			redis_client.set(`keys:${ client_key }`, JSON.stringify(user), (err: Error) => {

				if(err) {

					logger.trace(err)
					return reject(err);

				}
				
				/*
				 *
				 * Set a TTL
				 *
				 */
				redis_client.expire(`keys:${ client_key }`, settings.sessionTTL, (err: Error) => {

					resolve(client_key);

				})

			});

		})


	}

	/*
	 *
	 * Specify that a request should be authentified with a token
	 *
	 * This is a decorator. Use 
	 * `@needAuthentification` before the controller's method
	 *
	 */
	export let needAuthentification = cat.before((request: cat.Request) => {

		/*
		 *
		 * Casting the request so it can accept an user
		 *
		 */
		let sessRequest = <sessionRequest>request;

		/*
		 *
		 * Grab the signature from the headers
		 *
		 */
		let signature = <Signature>request.req.headers[keyName];

		/* 
		 *
		 * Checking if the user is connected and linking the user to the request
		 * If there's no user with that session key, throw a 401
		 *
		 */
		
		return session.check(signature)
				.then((user: User) => {

					sessRequest.user = user;
					sessRequest.key = signature;
					return sessRequest;

				}).catch((err: RangeError) => {

					throw {code: 401, response: {message: 'I don\'t know who you are, man'}};  

				})

	})

	/*
	 *
	 * Check that the signature is used and return the user
	 *
	 * @return The user
	 *
	 */
	export function check (sign: Signature): Promise<User> {

		return new Promise((resolve, reject) => {

			redis_client.get(`keys:${ sign }`, (err: Error, arg?: string) => {

				if(!arg) {

					let err = new RangeError(`No such key : ${sign}`)
					reject(err);

				}
				else {

					let user: User = JSON.parse(arg);
					resolve(user);  

				}

			})

		})

	}

	/*
	 *
	 * Log out the user
	 *
	 */
	export function logOut (sign: Signature): Promise<any> {

		return new Promise((resolve, reject) => 
			redis_client.del(`keys:${ sign }`, resolve))

	}

}
