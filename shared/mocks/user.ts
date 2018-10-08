import { User, Credentials } from '../models/user';

let UsersMock: User[] = [
	{
		name: 'Marc',
		_id: 'Marc',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 32,
		email: 'marc@gmail.com',
		place_of_origin: 'Dirty Village',
		presentation: 'I am a person',
		reputation: 12,
		vehicle: 'I ride an UFO',
		charge_per_km: 10

	},

	{
		name: 'Stephane',
		_id: 'Stephane',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 54 ,
		email: 'stephsteph@gmail.com',
		place_of_origin: 'Hellroad',
		reputation: 32,
		presentation: 'I am a person',
		vehicle: 'I ride an UFO',
		charge_per_km: 10
	},

	{
		name: 'Rick',
		_id: 'Rick',
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		age: 34,
		email: 'marcdu83@gmail.com',
		place_of_origin: 'Liege',
		reputation: 5,
		presentation: 'I am a person',
		vehicle: 'I ride an UFO',
		charge_per_km: 10
	},

	{
		name: 'Louise',
		_id: 'Louise',
		password: 'd716d4fdede0b78c0d0d1e5ad09227dff93be468dac0e93909b804c6ed200e46',
		age: 12,
		email: 'loulou@caraibmail.com',
		place_of_origin: 'Ocean side',
		reputation: 4,
		presentation: 'I am a person',
		vehicle: 'I ride an UFO',
		charge_per_km: 10
	},
	{
		name: 'PB',
		_id: 'princess77',
		password: '6afd4731177767192adaf5f064fc0fa88097d109',
		age: 17,
		email: 'princess@candykingdom.com',
		place_of_origin: 'Bubblegum castle',
		reputation: 9,
		presentation: 'I am a person',
		vehicle: 'I ride an UFO',
		charge_per_km: 10
	},
	{
		name: 'Moe',
		_id: 'Moe',
		age: 48,
		password: 'e51e002cf339122c1576deafff386d09dc0bda4a0',
		email: 'moe@simpsons.com',
		place_of_origin: 'Springfield',
		reputation: 23,
		presentation: 'I am a person',
		vehicle: 'I ride an UFO',
		charge_per_km: 10
	}
]

const userSignupExample: User = {
	_id: 'mordecai',
	name: 'Mordecai',
	email: 'rigbysuck@hotmail.com',
	password: 'e51e002cf339122c1576deafff386d09dc0bda40',
	age: 17,
	place_of_origin: 'The Park',
	reputation: 3,
	presentation: 'I am a person',
	vehicle: 'I ride an UFO',
	charge_per_km: 10
};

const userSignupCredentials	= {

	'login': 'PB',
	'password': '6afd4731177767192adaf5f064fc0fa88097d109',
	'rememberMe': true

};

let Rick = UsersMock[2];
let Louise = UsersMock[3];
let PB = UsersMock[4];

export { UsersMock, userSignupExample, userSignupCredentials, PB, Louise, Rick };
