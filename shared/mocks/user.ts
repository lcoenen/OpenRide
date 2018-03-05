import { User } from '../models/user';

let UsersMock: User[] = [
    {
      name: 'Marc',
      age: 32,
      place_of_origin: 'Dirty Village',
      reputation: 12 
    },

    {
      name: 'Stephane',
      age: 54 ,
      place_of_origin: 'Hellroad',
      reputation: 32 
    },

    {
      name: 'Rick',
      age: 34,
      place_of_origin: 'Liege',
      reputation: 54
    },
    
    {
      name: 'Louise',
      age: 12,
      place_of_origin: 'Ocean side',
      reputation: 47
    },
    {
      name: 'PB',
      age: 17,
      place_of_origin: 'Bubblegum castle',
      reputation: 92
    },
    {
      name: 'Moe',
      age: 48,
      place_of_origin: 'Springfield',
      reputation: 23 
    }
]

export { UsersMock };
