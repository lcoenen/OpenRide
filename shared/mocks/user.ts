import { User } from '../models/user';

let UsersMock: User[] = [
    {
			name: 'Marc',
			login: 'marc',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
			age: 32,
			email: 'marc@gmail.com',
      place_of_origin: 'Dirty Village',
      reputation: 12 
    },

    {
      name: 'Stephane',
			login: 'steph',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
      age: 54 ,
			email: 'stephsteph@gmail.com',
      place_of_origin: 'Hellroad',
      reputation: 32 
    },

    {
      name: 'Rick',
			login: 'ricksanchez',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
      age: 34,
			email: 'marcdu83@gmail.com',
      place_of_origin: 'Liege',
      reputation: 54
    },
    
    {
      name: 'Louise',
			login: 'louise',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
      age: 12,
			email: 'loulou@caraibmail.com',
      place_of_origin: 'Ocean side',
      reputation: 47
    },
    {
      name: 'PB',
			login: 'princess77',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
      age: 17,
			email: 'princess@candykingdom.com',
      place_of_origin: 'Bubblegum castle',
      reputation: 92
    },
    {
      name: 'Moe',
      age: 48,
			login: 'moe',
			password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
			email: 'moe@simpsons.com',
      place_of_origin: 'Springfield',
      reputation: 23 
    }
]

let userSignupExample: User = {
	_id: 'mordecai',
	name: 'Mordecai',
	login: 'mordecai',
	email: 'rigbysuck@hotmail.com',
	password: 'e51e002cf339122c1576deafff386d09dc0bda40',
	age: 17,
	place_of_origin: 'The Park',
	reputation: 32
}

export { UsersMock, userSignupExample };
