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
	 *
	 * Initialise the server
	 *
	 */
	export function initialise(settings: Config, api?: restify.Server) {

		if(!api) api = restify.createServer({
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
	 *
	 * Interface representing a route
	 *
	 * @interface
	 *
	 */
	export interface Route {

		verb: HttpVerb;
		route: string | RegExp;

	};

	export function isRoute(x: any) : x is Route {

		return x.verb !== undefined && x.route !== undefined;	

	}

	/*
	 *
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
		headers?: any;
		route?: Route;

	}

	/*
	 *
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
	 * Represent a hooks
	 *
	 * See `@execute()` decorator
	 *
	 * @interface
	 *
	 */
	export interface Hooks {

		property: number;
		callback?: (RestifyBurrito) => Promise<HttpAnswer<any> | (Promise<HttpAnswer<any>>) => Promise<HttpAnswer<any>>;

	}

	export function isHooks(x: any) : x is Hooks {

		return x.priority !== undefined && 
			typeof priority == 'number' &&
			x.callback !== undefined && (
				typeof x.callback == 'function' ||
				typeof x == 'function'
			);

	}

	interface HooksTable {
		before: Hooks[];	
		after: Hooks[];
		beforeAll: Hooks[];
		afterAll: Hooks[];	
	}

	export function isHooksTable(x: any) : x is HooksTable {

		let answer: boolean = true;
		for(field of ['before', 'after', 'beforeAll', 'afterAll']) 
			answer = answer &&
				(x[field].filter) &&
				(!x[field].filter((el: Hooks) => {

					return !isHooks(el);  

				}).length)
		return answer;

	} 

	let _defaultHooksTable = { 
		before: [],	
		after: [],
		beforeAll: [],
		afterAll[]
	}

	/*
	 *
	 * Mother class for controller
	 *
	 * To create a new controller, just create a child class of Controller and pass
	 * the list of route method to the `super()` constructor. This will call `routes()` and
	 * in turn each of the routes so they register inside restify.
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
	 *
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
	 * The decorated method will be called with the usual restify parameters (req: Request, 
	 * res: Response, next: Next). All other decorators only accept a RestifyBurrito. 
	 *
	 */
	export function route(route: Route);
	export function route(httpVerb: string, route: string)
	export function route(first: string | Route, route?: string){

		if(isRoute(first)) let httpVerb:string = first; 
		else let route:Route = first;

		logger.trace(`TRACE: Applying route`)

		return function (controller:any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;	
			let newFun = function  (api: any) {

				logger.trace(`TRACE: registering ${ httpVerb } ${ route }`)
				api[httpVerb](route, orig);

			}

			newFun.route = route;

			descriptor.value = newFun;
			return descriptor;

		}	

	}

	/*
	 * 
	 * modernify the route API
	 * 
	 * Accept promise return
	 * Recieve a burrito
	 * 
	 * This is a decorator. Use `@modernify()` before the controller's method
	 * It should be place AFTER route, given that route will include
	 * his input function directly inside restify.
	 *
	 * Modernify will create a Burrito with the restify request, execute the decorated function
	 * and expect a Promise. If the promise is resolved, the function expect a HttpAnswer of some sort.
	 * This answer contain the HTTP code and the JSON object to send back to the client. The promise can also 
	 * be resolved with a simple object. In that case, the server will send a code 200.
	 *
	 * If the Promise fails or throw a HttpAnswer, it will be sent back to the client with the right code. 
	 * Any other case is handled by sending back a 500 (Internal server error) code.
	 *
	 * @note If the return Promise contain an object that's not a HttpAnswer but contain a 
	 * `code` propertie, you're in trouble. See the function isHttpAnswer() for more information. 
	 *
	 */
	export function modernify<AnswerType>() {

		return function (controller: any, member: string, descriptor: PropertyDescriptor){

			logger.trace(`TRACE: Applying modernify. ${ member }`)

			const orig = descriptor.value;
			let hooks = function (req: restify.Request, res: restify.Response, next: restify.Next) {

				logger.trace(`TRACE: applying hooks`)

				let burrito: RestifyBurrito = {req, res};
				burrito.route = orig.route;
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
	 *
	 * Assert that the route needs a parameters
	 *
	 * This is a decorator. Use 
	 * `@needParams('restapi-key')` before the controller's method
	 *
	 *	Function can accept a string, a string[] or a validator (a function). The validator applies 
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
	 * `@answerParams(parameter(s))` before the controller's method
	 *
		One can use the same set of options as in needParams()
	 * This decorator will emit a 500 HttpAnswer if the response
	 * doesn't fit the given schema. Parameters will be grabbed from the response Promise.
	 *
	 * @note Validator in Typescript can absolutely be type guards.
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
	 *
	 * Check that the route takes specifics headers.
	 *
	 * This is a decorator. Use 
	 * `@needHeader(header:string)` before the controller's method
	 *
	 * If the header isn't there, the decorator will throw a HttpAnswer with a 400 
	 * (Bad request) code. Header will be made available under burrito.headers[header].
	 *
	 */
	export function needHeader(header: string){

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function (burrito: RestifyBurrito){

				if(!burrito.headers) burrito.headers = {} 
				let val = burrito.req.header(header)
				if(!val) { throw { code: 400, Error(`ERROR: no header ${ header } in ${ member }`)} }	
				else 			burrito.headers[header] = val;

				return orig(burrito);

			}

			return descriptor;

		}

	}

	/*
	 *
	 * Check that the route have answer a specific header
	 * and push this header into restify
	 *
	 * This is a decorator. Use 
	 * `@answerHeader(header: string)` before the controller's method
	 *
	 * If the header is not there, the decorator will throw a HttpAnswer with a 500
	 * (Internal server Error) code. Headers will be grabbed from burrito.headers and
	 * pushed into the `res` object of restify.
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
	 *
	 * Interface for logger configuration
	 *
	 * This interface explains the @logger decorator how to log things.
	 * Especially, it is used to know to which level it should log request, 
	 * answers and errors into bunyan.
	 * 
	 * @interface
	 *
	 * @properties logger The logger used. Can be a bunyan or anything else that implement methods
	 * 		correspondings to the differents levels of log
	 * @property input Logging of incoming requests from clients (default: info)
	 * @property output Logging of routes response (default: debug)
	 * @property error Logging of server error (400 types, default: error)
	 * @property internal Logging of internal error or assertions error, unhandled throw,... (default: fatal)
	 * @property watch a list of string representing value that can be watched. It can also be a
	 * 	`(Logger) => string[]?` function
	 *
	 */
	interface LoggerConfig {
		logger: any;
		input: string;
		output: string;
		error: string;
		internal: string;
		watch?: string[] | (any, any) => string[]?)
	}

	let loggerDefaultConfig: LoggerConfig = {

		logger: console,
		input: 'info',
		output: 'debug',
		error: 'error',
		internal: 'fatal'
		watch: []
	}

	/*
	 *
	 * Log routes input and output
	 *
	 * This CAN BE USED as a decorator. Apply `@logger` with or without 
	 * LoggerConfig argument before the function. You can also use this
	 * as a standalone function. In this case, it will simply set the 
	 * configuration and keep it as a function property.
	 * 
	 */
	export function logger<T>(config?: LoggerConfig){

		if(this.config === undefined) this.config = Object.assign({}, loggerDefaultConfig)
		if(config !== undefined) config = Object.assign(this.config, config);

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;

			descriptor.value = function(burrito: RestifyBurrito){

				config.logger[config.input](`INPUT: ${ burrito.route.verb } ${ burrito.route.route }`)
				let prom: Promise<HttpAnswer<T>> = orig(burrito).then((answer: HttpAnswer<T>) => {

					config.logger[config.output](`OUTPUT: ${ burrito.route.verb } ${ burrito.route.route }`)	
					if(typeof config.watch === 'function') config.watch = config.watch(answer, config.logger);
					if (config.watch) for(watch_var of config.watch){
						config.logger[config.input](answer[watch_var])	
					}

					return answer;

				}).catch((err: HttpAnswer<T>) => {

					config.logger[config.error](`ERROR: ${ burrito.route.verb } ${ burrito.route.route }`)  
					config.logger[config.error](`ERROR: We got a ${ err.code } error`)
					config.logger[config.error](err.message)
					return err;

				}).catch(err: Error){

					config.logger[config.internal](`INTERNAL: ${ burrito.route.verb } ${ burrito.route.route }`)	
					config.logger[config.internal](err)

				}

				return prom;			

			}

			return descriptor;

		}

	}

	/* 
	 *
	 * Execute the function as a before hooks
	 *
	 * The function will recieve a burrito and return a Promise<RestifyBurrito>,
	 * If the promise is resolved with a burrito, the decorated function will be called with the
	 * burrito. If it's solved with a HttpResponse, it will be emited and the decorated function will
	 * not be called at all. If rejected, the error workflow will continue (if it throw or reject with a HttpAnswer, 
	 * it will be used. Otherwise, a 500 will be sent).
	 *
	 * The `after` and `before` function can be used to create a new decorator from scratch. 
	 * Simply call `before(cb)` and assign it's return function to a variable. 
	 *
	 */
	export function before<T> (cb: (RestifyBurrito) => Promise<HttpAnswer<T> | RestifyBurrito) {

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;	

			descriptor.value = function(burrito: RestifyBurrito) {

				cb(burrito).then((ans: HttpAnswer<T> | RestifyBurrito) => {

					if(isBurrito(ans))				
						return orig(ans);		
					else
						return ans;	

				})

			}

			return descriptor;
		} 

	}

	/*
	 *
	 * Execute the function as an after hooks
	 *
	 * The function will be called after the decorated one. It will recieve a promise with 
	 * the answer from the decorated, and should return a promise. Again, if the promise contains
	 * a HttpAnswer, it will be used. Otherwise, a 500 will be answered and an Internal error emitted.
	 *
	 * This hooks is always called, even if there's an error or a fatal. The function is 
	 * expected to take a HttpAnswer of some sort OR an Error. It is thus hooks responsability
	 * to check HTTP status. If the status of the response is a 40x or 50x, it will follow the 
	 * throw-catch and rejected promise flow. If it's a 20x or a 30x, or anything else, it
	 * will go back to normal flow.
	 *
	 */
	export function after<T> (cb: (RestifyBurrito) => Promise<HttpAnswer<T> | RestifyBurrito) {

		return function (root: any, member: string, descriptor: PropertyDescriptor) {

			const orig = descriptor.value;	

			descriptor.value = function(burrito: RestifyBurrito) {

				return orig(burrito).then((answer: HttpAnswer<T>) => {

					return cb(ans); 

				}).catch((err: HttpAnswer<T> | Error) => {

					let answer: HttpAnswer<T> | Error = cb(err);  
					if(isHttpAnswer(answer)) {
						if(answer.code > 400) return answer;;
						else throw answer;
					}
					throw answer;
				})

			}

			return descriptor;
		} 

	}

	/*
	 * Execute a function before ALL routes
	 *
	 * The execution is supposed to takes place after all other decorators, but 
	 * before other `@before()` hooks (That being said, this is not a garanteed behavior). 
	 * The decorator can be used on the controller and on the catnapify server instance.
	 *
	 * One could extend the Burrito interface so he could transmit his own datas.
	 * The behavior is overall the same as `before()` hooks
	 *
	 */
	export function beforeAll (table? : HooksTable) {

		/*
		 * Quite frankly, I don't know how to implement that. If you want to help, see
		 * CONTRIBUTE
		 */
		throw Error('Not implemented')

	}
	
	/* 
	 *
	 * Execute a function after ALL threatement.
	 *
	 * The execution takes place before decorators such as answerParams or answerHeader,
	 * but after other `@after()` hooks. Overall, the behavior regarding error flow and
	 * HttpAnswer are the same as other `@after()` hooks
	 *
	 */
	export function afterAll (table? : HooksTable) {

		/*
		 * Quite frankly, I don't know how to implement that. If you want to help, see
		 * CONTRIBUTE
		 */
		throw Error('Not implemented')

	}

	/*
	 * Execute hooks with fine grain priority control
	 *
	 * This function execute hooks contained in burrito.hooks. Burrito.hooks
	 * can contain four (before, after, beforeAll and Afterall) arrays of Hooks, 
	 * each being gifter with at least the priority, and being a function or having
	 * a `callback` property
	 *
	 */
	export function hooks (table? : HooksTable) {

		/*
		 * Quite frankly, I don't know how to implement that. If you want to help, see
		 * CONTRIBUTE
		 */
		throw Error('Not implemented')
		
		// return function (root: any, member: string, descriptor: PropertyDescriptor) {

		// 	const orig = descriptor.value;

		// 	descriptor.value = function(burrito: RestifyBurrito) {

		// 		burrito.hooks.before.sort((hook: Hooks) => return hook.priority; })
		// 		for(hook in burrito.hooks.before) return; 

		// 	}

		// 	return descriptor;

		// }

	}

	/*
	 *
	 * Makes the server listen to incoming connection. The server will return a Promise, 
	 * that will resolve when restapi will start listening. 
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
