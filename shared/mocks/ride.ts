import { Ride, RideType } from '../models/ride';
import { Place } from '../models/place';

import { PlacesMock } from './place';

import * as moment from 'moment';

export let RidesMock: Ride[] = [
	{
		_id: 'LiegeLiege',
		type: RideType.OFFER,
		origin: PlacesMock[0],
		destination: PlacesMock[1],
		riding_time: moment().add(2, 'days').toDate(),
		driver: { '@id': '/api/users/Moe' },
		riders: [{ '@id': '/api/users/Stephane' }, { '@id': '/api/users/Rick' }]
	},

	{
		_id: 'LiegeBruxelles',
		type: RideType.OFFER,
		origin: PlacesMock[1],
		destination: PlacesMock[3],
		riding_time: moment().add(1, 'days').hour(12).minute(32).toDate(),
		riders: [ { '@id': '/api/users/Louise' },
			{ '@id': '/api/users/PB' }],
		driver: { '@id': '/api/users/Stephane' }
	},

	{
		_id: 'MaastrichtBruxelles',
		origin: PlacesMock[2],
		type: RideType.OFFER,
		destination: PlacesMock[3],
		riding_time: moment().add(3, 'days').hour(11).minute(50).toDate(),
		riders: [ { '@id': '/api/users/PB' } ],
		driver: { '@id': '/api/users/Moe' }
	},

	{
		_id: 'ValenciennesLiege',
		type: RideType.OFFER,
		origin: PlacesMock[4],
		destination: PlacesMock[1],
		riding_time: moment().add(2, 'days').hour(10).minute(19).toDate(),
		riders: [],
		driver: { '@id': '/api/users/Rick' }
	},
	{
		_id: 'BruxellesLiege',
		type: RideType.OFFER,
		origin: PlacesMock[3],
		destination: PlacesMock[0],
		riding_time: moment().add(1, 'days').hour(15).minute(43).toDate(),
		riders: [],
		driver: { '@id': '/api/users/Louise' }
	},
	{
		_id: 'BruxellesLiegeRequest',
		type: RideType.REQUEST,
		origin: PlacesMock[5],
		destination: PlacesMock[1],
		riding_time: moment().add(1, 'days').hour(12).minute(32).toDate(),
		riders: [{'@id': '/api/users/Rick'}],
	}
]


export const postDriverExample: Ride = {
	'_id': 'EindhovenMaastricht',
	'type': RideType.OFFER,
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.420274, 5.443317]
		},
		'properties': {
			'address': 'Eimerick, 25, Eindhoven, NL'
		}
	},
	'destination': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.853967, 5.669858]
		},
		'properties': {
			'address': 'Edmond Jasparstraat, 33, Rossumplein, 6221, Maastricht, NL'
		}
	},
	'riding_time': moment().add(1, 'days').hour(10).minute(10).toDate(),
	'payement': 32,
	'driver': { '@id': '/api/users/Moe' },
	'riders': []
}

export const postRiderExample = {
	'_id': 'EindhovenMaastrichtRequest',
	'type': RideType.REQUEST,
	'origin': {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [51.479450, 5.63882]
		},
		'properties': {
			'address': 'Mathisjssensstraat, 13, Eindhoven, NL'
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
	'riding_time': moment().add(1, 'days').hour(14).minute(30).toDate(),
	'payement': 23,
	'riders': [{ '@id': '/api/users/Moe' }]
}

export const postDriverLesserExample: Ride = {
	'_id': 'EindhovenMaastrichtLesser',
	'type': RideType.OFFER,
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
			'coordinates': [50.997098, 5.876827]
		},
		'properties': {
			'address': 'Swentiboldstraat, 19, Sittard, NL'
		}
	},
	'riding_time': moment().add(3, 'days').hour(18).minute(0).toDate(),
	'payement': 89,
	'driver': { '@id': '/api/users/Moe' },
	'riders': []
}
