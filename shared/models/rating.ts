import { Link, isLink } from './link';

/*
 *
 * This will represant a rating given by an user
 *
 */
export interface Rating {

	/*
	 *
	 *	This will be the ride linked to the rating
	 *
	 */
	ride: Link;

	/*
	 *
	 * This will be the user the rating is coming from
	 *
	 */
	from: Link;

	/*
	 *
	 * This will be the rated user
	 *
	 */
	to: Link;

	/*
	 *
	 * This is the rate the user has been given
	 *
	 */
	rate: number;

}

export function isRating(x: any) : x is Rating {

	return [
		x.ride, x.from, x.to, x.rate	
	].filter((x:any) => x === undefined)
	.length == 0 
		&& isLink(x.ride)
		&& isLink(x.from)
		&& isLink(x.to)

}
