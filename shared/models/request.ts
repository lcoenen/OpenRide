import { Link } from './link';

export interface Request {
	_id?: string;
	// The user whom the request come from
  from?: Link;
	// The ride he'd like to join
	to: Link;
};
