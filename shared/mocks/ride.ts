import { Ride } from '../models/ride';
import { Place } from '../models/place';

import { PlacesMock } from './place';

export let RidesMock: Ride[] = [
	{
		_id: 'LiegeLiege',
		origin: PlacesMock[0],
		destination: PlacesMock[1],
		riding_time: 'Tomorrow 23:32',
		driver: { '@id': '/api/users/Moe' },
		riders: [{ '@id': '/api/users/Stephane' }, { '@id': '/api/users/Rick' }]
	},

	{
		_id: 'LiegeBruxelles',
		origin: PlacesMock[1],
		destination: PlacesMock[3],
		riding_time: 'Tomorrow 12:52',
		riders: [ { '@id': '/api/users/Louise' },
			{ '@id': '/api/users/PB' }],
		driver: { '@id': '/api/users/Stephane' }
	},

	{
		_id: 'MaastrichtBruxelles',
		origin: PlacesMock[2],
		destination: PlacesMock[3],
		riding_time:'In two days, 9:32',
		riders: [ { '@id': '/api/users/PB' } ],
		driver: { '@id': '/api/users/Moe' }
	},

	{
		_id: 'ValenciennesLiege',
		origin: PlacesMock[4],
		destination: PlacesMock[1],
		riding_time:'In 3 days, 13:45',
		riders: [],
		driver: { '@id': '/api/users/Rick' }
	},
	{
		_id: 'BruxellesLiege',
		origin: PlacesMock[3],
		destination: PlacesMock[0],
		riding_time:'Tomorrow, 4:20',
		riders: [],
		driver: { '@id': '/api/users/Louise' }
	}
]


export const postDriverExample: Ride = {
	'_id': 'EindhovenMaastricht',
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.437935, 5.462851]
		},
		'properties': {
			'address': 'Jacobus Deckerstraat, 94, Eindhoven, NL'
		}
	},
	'destination': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.841862, 5.708596]
		},
		'properties': {
			'address': 'Kardinaal van Rossumplein, 6221, Maastricht, NL'
		}
	},
	'riding_time': 'Tomorrow at 10:32',
	'payement': 23,
	'driver': { '@id': '/api/users/Moe' },
	'riders': []
}

export const postRiderExample = {
	'_id': 'EindhovenMaastrichtRequest',
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.437935, 5.462851]
		},
		'properties': {
			'address': 'Jacobus Deckerstraat, 94, Eindhoven, NL'
		}
	},
	'destination': {
		'type': 'urleature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.841862, 5.708596]
		},
		'properties': {
			'address': 'Kardinaal van Rossumplein, 6221, Maastricht, NL'
		}
	},
	'riding_time': 'Tomorrow at 10:32',
	'payement': 23,
	'riders': [{ '@id': '/api/users/Moe' }]
}
