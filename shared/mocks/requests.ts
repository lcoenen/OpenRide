import { Request } from '../models/request';

export let RequestsMock: Request[] = [
	{
		from: { '@id': '/api/users/Louise' },
		to: { '@id': '/api/rides/MaastrichtBruxelles' }
	},
	{
		from: { '@id': '/api/users/princess77' },
		to: { '@id': '/api/rides/BruxellesLiege' }
	},

];

