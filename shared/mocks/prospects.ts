import { Prospect, ProspectType } from '../models/prospect';

export let ProspectsMock: Prospect[] = [
	{
		ride: {'@id': '/api/rides/BruxellesLiegeRequest' },
		with: {'@id': '/api/rides/BruxellesLiege' },
		type: ProspectType.INVITE
	}
];

