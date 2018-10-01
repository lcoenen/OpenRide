import { Link, isLink } from './link';
import { Ride } from './ride';


/*
 *
 * This will be the type of the prospect
 *
 * - INVITE means the driver invite a rider. Thus, the 'ride'
 * 	 will be an request and 'with' the ride proposition.
 * - APPLY means the rider apply to join a ride. Thus, the 'ride' propety
 * 	 will target an offer and the 'with' a request
 *
 */
export enum ProspectType {

	INVITE,
	APPLY

}

/*
 * 
 * This can represent an invite OR a request to 
 * a ride. 
 *
 */
export interface Prospect {

	_id?: string;

	/*
	 *
	 * This is the ride the prospect is linked to.
	 *
	 * If me, rider, want to request to join a ride, I will 
	 * POST /api/rides/:id/prospects with an object {with: Link} (see
	 * with property
	 * 
	 * The ride :id will be linked with the ride property
	 *
	 */
	ride: Link | Ride;

	/*
	 *
	 * This is the ride the prospect is linked with
	 *
	 * If the ride is an offer and the 'with' is a request,
	 * it's a rider signiling he want to join the ride.
	 *
	 * If the ride is a request and the 'with' is an offer,
	 * the driver is inviting the rider
	 *
	 */
	with: Link | Ride;

	/*
	 *
	 * This will be the type of the prospect (see ProspectType)
	 *
	 * This will be computed by the server
	 *
	 */
	type?: ProspectType;

};

/*
 *
 * This is a typeguard that check that an object is of
 * type Prospect
 *
 */
export function isProspect(x: any): x is Prospect {

	return isLink(x.ride) && isLink(x.with);

}
