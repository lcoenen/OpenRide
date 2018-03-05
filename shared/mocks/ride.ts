import { Ride } from '../models/ride';
import { Place } from '../models/place';

import { PlacesMock } from './place';

let RidesMock: Ride[] = [
    {
      origin: PlacesMock[0],
      destination: PlacesMock[1],
			riding_time: 'Tomorrow 23:32',
			driver: { '@id': '/users/Moe' },
      riders: [{ '@id': '/users/Stephane' }, { '@id': '/users/Rick' }]
    },

    {
      origin: PlacesMock[1],
      destination: PlacesMock[3],
      riding_time: 'Tomorrow 12:52',
			riders: [ { '@id': '/users/Louise' },
			{ '@id': '/users/PB' }],
			driver: { '@id': '/users/Stephane' }
    },

    {
      origin: PlacesMock[2],
      destination: PlacesMock[3],
      riding_time:'In two days, 9:32',
			riders: [ { '@id': '/users/PB' } ],
			driver: { '@id': '/users/Moe' }
    },
    
    {
      origin: PlacesMock[4],
      destination: PlacesMock[1],
      riding_time:'In 3 days, 13:45',
			riders: [],
			driver: { '@id': '/users/Rick' }
    },
    {
      origin: PlacesMock[3],
      destination: PlacesMock[0],
      riding_time:'Tomorrow, 4:20',
			riders: [],
			driver: { '@id': '/users/Louise' }
    }
]

export { RidesMock };
