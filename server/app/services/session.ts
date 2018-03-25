import * as redis from 'redis';

import { Link } from '../../../shared/models/link';
import { User, Credentials } from '../../../shared/models/user';

import { db } from '../services/db';
import { logger } from '../services/logger';
import { settings } from '../config/config';

import { hash } from '../../../shared/lib/hash';

const salt = '5ce5be34c720d80d9d0075bccb47e7e56db9d36c';

export type Signature = string;
// type ApiError = Error;

let redis_client = redis.createClient()

export namespace session {

	// export let loggedInUser: Link = { '@id': '/api/users/Louise' }	

	/*
	 * Return a token that have to be sent to the client.
	 *
	 * Register the tokens inside redis under the form
	 * SET keys:<client_key> JSON.stringify(user)
	 *
	 */
	export function authentify (user: User): Promise<Signature> {
	
		logger.trace(`TRACE: session.authentify()`)

		return new Promise((resolve, reject) => {

			let first_hash: string = hash(`${ salt }user ${ user.login } / ${ user.password } ${ (new Date()).toString() }`)
			let client_key = hash(first_hash.substr(0,20))		

			logger.info(`INFO: hashed ${ client_key }`)

			redis_client.set(`keys:${ client_key }`, JSON.stringify(user), (err: Error) => {

				logger.trace(`TRACE: Included into redis`)
				if(err) {
					
					logger.trace(err)
					return reject(err);
					
				}

				redis_client.expire(`keys:${ client_key }`, settings.sessionTTL, (err: Error) => {
   
					resolve(client_key);

				})

			});

		})


	}

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

	export function logout (sign: Signature): Promise<any> {

		return null; 

	}

}
