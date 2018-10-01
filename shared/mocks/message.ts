import { Message } from '../models/message';

import * as moment from 'moment';

let MessagesMock: Message[] = [
	{
		"ride": { '@id' : "/api/rides/LiegeLiege" },
		"message": "Hey les gars, on se retrouve ou?",
		"author": { '@id' : "/api/users/Moe"},
		"date": moment().add(-2, 'days').toDate(),
	},

	{
		"ride": { '@id' : "/api/rides/LiegeLiege"},
		"message": "Au pot au lait?",
		"author": { '@id' : "/api/users/Rick"},
		"date": moment().add(-2, 'days').toDate(),
	},

	{
		"ride": { '@id' : "/api/rides/MaastrichtBruxelles"},
		"message": "Bonjour! Je serais un petit peu en retard ou?",
		"author": { '@id' : "/api/users/PB"},
		"date": moment().add(-2, 'days').toDate(),
	},

	{
		"ride": { '@id' : "/api/rides/MaastrichtBruxelles"},
		"message": "Pas de soucis, PB! :)",
		"author": { '@id' : "/api/users/Moe"},
		"date": moment().add(-1, 'days').toDate(),
	},
	{
		"ride":  { '@id' : "/api/rides/BruxellesLiege" },
		"message": "Pourquoi personne ne veut que je conduise?",
		"author":  { '@id' : "/api/users/Louise" },
		"date": moment().add(-3, 'days').toDate(),
	}
]

let messagePostExample = {
	"ride": {'@id': '/api/rides/MaastrichtBruxelles'},
	"message": "Voila, je suis la!",
	"author": {"@id": "/api/users/princess77"},
	"date": 43214128
}

export { MessagesMock, messagePostExample };
