import * as redis from 'redis';

import { Link } from '../../../shared/models/link';
import { User, Credentials } from '../../../shared/models/user';

import { db } from '../services/db';
import { logger } from '../services/logger';

import { hash } from '../../../shared/lib/hash';

const salt = '5ce5be34c720d80d9d0075bccb47e7e56db9d36c';

export type Signature = string;
// type ApiError = Error;

let redis_client = redis.createClient()

export namespace session {

	// export let loggedInUser: Link = { '@id': '/api/users/Louise' }	

	/*
	 * Return a token that have to be sent to the client
	 */
	export function authentify (cred?: Credentials): Promise<Signature> {
	
		logger.trace(`TRACE: session.authentify()`)

		if (!cred) return Promise.reject(new RangeError('No credentials'));

		logger.trace(`TRACE: we have cred!`)

		return new Promise((resolve, reject) => {

			let first_hash: string = hash(`${ salt }cred ${ cred.login } / ${ cred.password } ${ (new Date()).toString() }`)
			let client_key = hash(first_hash.substr(0,20))		

			logger.info(`INFO: hashed ${ client_key }`)

			redis_client.hset('keys', client_key, cred.login, (err: Error) => {
				
				logger.trace(`TRACE: Included into redis`)
				logger.trace(err)
				resolve(client_key);

			});

		})


	}

	export function check (sign: Signature): Promise<User> {

		return new Promise((resolve, reject) => {

			redis_client.hget('keys', sign, (err: Error, arg?: string) => {

				if(!arg) {
					let err = new RangeError(`No such key : ${sign}`)
					reject(err);
				}
				else {

					db.db.collection('users').findOne({login: arg})
						.then((user: User) => {

							if(user)
								resolve(user)  
							else {

								let err = new RangeError(`No such user : ${arg}`)
								reject(err)
							
							}

						});

				}
			})	

		})

	}

	export function logout (sign: Signature): Promise<any> {

		return null; 

	}

	export function loggedInUser() : User {

		return null;

	}


}
