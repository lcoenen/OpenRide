import * as restify from 'restify';


import { User } from '../../../shared/models/user';

import { settings } from '../config/config';

import { logger } from './logger';

import { Config } from '../types';

function isString(x: any): x is string {
	return typeof x === "string";
}

function isFunction(x: any): x is Function {
	return typeof x === "function";
}


function isArrayofString(x: any): x is String[] {
	return x.filter != undefined &&
		!(x.filter((v:any) => {
			return !isString(v);	
		}).length)
}

/*
 *
 * Catnapify is a wrapper around restify. It implements some decorators to
 * modernify request handling.
 *
 * @namespace
 *
 */
export namespace catnapify {

	let api: any = null;

	/*
	 * Initialise the server
	 */
	export function initialise(settings: Config) {

		api = restify.createServer({
			name: settings.name
		});

		restify.CORS.ALLOW_HEADERS.push('authorization');
		api.use(restify.CORS());
		api.pre(restify.pre.sanitizePath());
		api.use(restify.acceptParser(api.acceptable));
		api.use(restify.bodyParser());
		api.use(restify.queryParser());
		api.use(restify.authorizationParser());
		api.use(restify.fullResponse());

	}

	/*
	 *	Wrapper around Restify request, response and next type
	 *	
	 *	@interface
	 *
	 */
	export interface RestifyBurrito {

		req: restify.Request;
		res: restify.Response;
		next?: restify.Next;
		user?: User;
		params?: any;
		headers? any;
	}

	/*
	 * HttpAnswer represent an answer from the handler.
	 *
	 * @interface
	 *
	 */
	export interface HttpAnswer<T> {

		code: number;
		answer: T | Error;

	}

	export function isHttpAnswer<T>(ans: any) : ans is HttpAnswer<T> {

		return (ans.code !== undefined) && (ans.answer != undefined);	

	};

	/*
	 *
	 * Mother class for controller
	 *
	 */
	export class Controller {

		protected _restapi: restify.Server;

		public constructor(routes: string[]){

			this._restapi = api;
			this.routes(routes);

		}

		public routes(meths: string[]) {

			for(let meth of meths) {

				let that: any = <any>this;
				that[meth](this._restapi);	

			}	

		}

	}

	/*
	 * modernify the route API
	 * 
	 * Accept promise return
	 * Recieve a burrito
	 * 
	 * This is a decorator. Use 
	 * `@modernify()` before the controller's method
	 * It should be place AFTER route, given that route will include
	 * his input function directly inside restify
	 *
	 */
	export function modernify<AnswerType>() {

		return function (controller: any, member: string, descriptor: PropertyDescriptor){

			logger.trace(`TRACE: Applying modernify. ${ member }`)

			const orig = descriptor.value;
			let hooks = function (req: restify.Request, res: restify.Response, next: restify.Next) {

				logger.trace(`TRACE: applying hooks`)

				let burrito: RestifyBurrito = {req, res};
				let promise: Promise<HttpAnswer<AnswerType>> = orig(burrito);

				promise.then((answer: HttpAnswer<AnswerType> | AnswerType) => {

					if(catnapify.isHttpAnswer(answer))
						res.json(answer.code, answer.answer);  
					else
						res.json(200, answer)


				}).catch((err: HttpAnswer<Error>) => {

					res.json(err.code, err.answer);
					logger.error(`ERROR: Caught a ${ err.code } error in route ${ member } `);
					logger.error(`Answer: ${ err.answer }`)

				}).catch((err: Error) => {

					res.json(500, err);

				})
			}

			descriptor.value = hooks;

			return descriptor;

		}

	}

	/*
	 * Establish a route inside the API
	 *
	 * This is a decorator. Use 
	 * `@route('verb', '/api/route)` before the controller's method.
	 *
	 * This replace the function with a one that record the route in restify according to the 
	 * route parameters. Thus, it won't have any effect before the method is called. That is why
	 * one have to call the method manually or register the route using the Controller.constructor()
	 * method.
	 *
	 * The input method will be called wit the usual restify parameters (req: Request, 
	 * res: Response, next: Next). All other decorators only accept a RestifyBurrito. 
	 *
	 */
	export function route(httpVerb: string, route: string){

		logger.trace(`TRACE: Applying route`)

		return function (controller:any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;	
			let newFun = function  (api: any) {

				logger.trace(`TRACE: registering ${ httpVerb } ${ route }`)
				api[httpVerb](route, orig);

			}
			descriptor.value = newFun;
			return descriptor;

		}	

	}

	/*
	 * Assert that the route needs a parameters
	 *
	 * This is a decorator. Use 
	 * `@needParams('verb', '/api/route)` before the controller's method
	 *
	 *	Function can accept a string, a string[] or a validator. The validator applies 
	 *	on the request object and should return a boolean. If the parameters isn't found,
	 *	the function will throw a HttpAnswer with code 400 (Bad request)
	 *
	 */
	export function needParams(params: string): any;
	export function needParams(params: string[]) : any;
	export function needParams<T>(assert: (t: T) => boolean) : any;
	export function needParams<T>(param_assert: ((t: T) => boolean) | string | string[]) : any {

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function(burrito: RestifyBurrito) {

				burrito.params = burrito.req.params;	

				if(isString(param_assert)){

					if(burrito.req.params[param_assert] === undefined) throw { 
						code: 400, 
						answer: `ERROR: Argument ${ param_assert } missing on route ${ member }`
					}	

				}	else if (isArrayofString(param_assert)) {

					for(let param of param_assert) {

						if(burrito.req.params[param] === undefined) throw { 
							code: 400, answer: `ERROR: Argument ${ param } missing on route ${ member }`
						}	

					}

				} else {

					if(!param_assert(burrito.req.params)) throw {
						code: 400,
						answer: `Error: route ${ member } didn't pass validation`
					}	

				}

				return orig(burrito);

			}	

			return descriptor;
		}

	}

	/*
	 *
	 * Assert that the route will answer some values
	 *
	 * This is a decorator. Use 
	 * `@answerParams('verb', '/api/route)` before the controller's method
	 *
	 * One can use the same set of options as in needParams()
	 * This decorator will emit a 500 HttpAnswer if the response
	 * doesn't fit the given schema. 
	 *
	 */

	export function answerParams(params: string): any;
	export function answerParams(params: string[]) : any;
	export function answerParams<T>(assert: (t: T) => boolean) : any;
	export function answerParams<T>(param_assert: ((t: T) => boolean) | string | string[]) : any {

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function(burrito: RestifyBurrito) {

				if(!burrito.params) burrito.params = burrito.req.params;

				return orig(burrito).then((value: any) => {

					if(isString(param_assert)){

						if(value[param_assert] === undefined) throw { 
							code: 500, 
							answer: `ERROR: Argument ${ param_assert } missing on route ${ member }`
						}	

					}	else if (isArrayofString(param_assert)) {

						for(let param of param_assert) {

							if(value[param] === undefined) throw { 
								code: 500, answer: `ERROR: Argument ${ param } missing on route ${ member }`
							}	

						}

					} else {

						if(!param_assert(value)) throw {
							code: 500,
							answer: `Error: route ${ member } didn't pass validation`
						}	

					}

				})

			}	

			return descriptor;
		}

	}

	/*
	 * Check that the route takes specifics headers.
	 *
	 * This is a decorator. Use 
	 * `@needHeader('verb', '/api/route)` before the controller's method
	 *
	 * If the header isn't there, the decorator will throw a HttpAnswer with a 400 
	 * (Bad request) code.
	 *
	 */
	export function needHeader(header: string){
	
		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function (burrito: RestifyBurrito){
			
				if(!burrito.headers) burrito.headers = {} 
				let val = burrito.req.header(header)
				if(!val) 	throw { code: 400, Error(`ERROR: no header ${ header } in ${ member }`)}	
				else 			burrito.headers[header] = val;
				
				return orig(burrito);
			
			}

			return descriptor;

		}
	
	}

	/*
	 * Check that the route have answer a specific header
	 * and push this header into restify
	 *
	 * This is a decorator. Use 
	 * `@answerHeader('verb', '/api/route)` before the controller's method
	 *
	 * If the header is not there, the decorator will throw a HttpAnswer with a 500
	 * (Internal server Error) code
	 *
	 */
	export function answerHeader(header: string){
	
		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function (burrito: RestifyBurrito){
			
				return orig(burrito).then((val: any) => {
					
					let val = burrito.headers[key]
					if(!val) throw Error('ERROR: header ')
					burrito.res.header(key, val);	
					
				  return val;  

				});
			
			}

			return descriptor;

		}
	
	}

	/*
	 * Makes the server listen
	 *
	 * The server will return a Promise, that will resolve when restapi
	 * will start listening. 
	 *
	 */
	export function listen(): Promise<void> {

		return new Promise((resolve, reject) => {

			api.listen(settings.port, function (err: Error) {
				if(!err) {

					resolve()
					logger.info(`INFO: ${settings.name} is running at ${api.url}`);

				}
				else reject()

			});

		})

	}

}
