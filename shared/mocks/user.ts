import { User, Credentials } from '../models/user';

let UsersMock: User[] = [
	{
		name: 'Marc',
		_id: 'Marc',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 32,
		email: 'marc@gmail.com',
		place_of_origin: 'Dirty Village',
		reputation: 12 
	},

	{
		name: 'Stephane',
		_id: 'Stephane',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 54 ,
		email: 'stephsteph@gmail.com',
		place_of_origin: 'Hellroad',
		reputation: 32 
	},

	{
		name: 'Rick',
		_id: 'Rick',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 34,
		email: 'marcdu83@gmail.com',
		place_of_origin: 'Liege',
		reputation: 54
	},

	{
		name: 'Louise',
		_id: 'Louise',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 12,
		email: 'loulou@caraibmail.com',
		place_of_origin: 'Ocean side',
		reputation: 47
	},
	{
		name: 'PB',
		_id: 'princess77',
		password: '6afd4731177767192adaf5f064fc0fa88097d109',
		age: 17,
		email: 'princess@candykingdom.com',
		place_of_origin: 'Bubblegum castle',
		reputation: 92
	},
	{
		name: 'Moe',
		_id: 'Moe',
		age: 48,
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		email: 'moe@simpsons.com',
		place_of_origin: 'Springfield',
		reputation: 23 
	}
]

const userSignupExample: User = {
	_id: 'mordecai',
	name: 'Mordecai',
	email: 'rigbysuck@hotmail.com',
	password: 'e51e002cf339122c1576deafff386d09dc0bda40',
	age: 17,
	place_of_origin: 'The Park',
	reputation: 32
}

const userSignupCredentials	= {

	'login': 'princess77',
	'password': '6afd4731177767192adaf5f064fc0fa88097d109',
	'rememberMe': true

}

let PB = UsersMock[5]

export { UsersMock, userSignupExample, userSignupCredentials, PB };
