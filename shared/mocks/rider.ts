import { Rider } from '../models/rider';

let RidersMock: Rider[] = [
    {
      name: 'Marc',
      age: 32,
      place_of_origin: 'Dirty Village',
      origin: '22 Dirty street, Dirty Village',
      destination: '45 Dirtier street, Paris',
      riding_time: 'Tomorrow 23:32',
      reputation: 12 
    },

    {
      name: 'Stephane',
      age: 54 ,
      place_of_origin: 'Hellroad',
      origin: '43 Concil street, Dirty Village',
      destination: '20 Champs Elizee, Paris',
      riding_time: 'Tomorrow 23:32',
      reputation: 32 
    },

    {
      name: 'Rick Duboi',
      age: 34,
      place_of_origin: 'Dirty Village',
      origin: '312 Nextroad, Beside place',
      destination: '323 Event street, St-Germain',
      riding_time:'In two days, 9:32',
      reputation: 54
    }
    
]

export { RidersMock };
