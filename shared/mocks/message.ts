import { Message } from '../models/message';

let MessagesMock: Message[] = [
	{
		"ride": { '@id' : "/api/rides/LiegeLiege" },
		"message": "Hey les gars, on se retrouve ou?",
		"author": { '@id' : "/api/users/Moe"},
		"date": 43214124
	},

	{
		"ride": { '@id' : "/api/rides/LiegeLiege"},
		"message": "Au pot au lait?",
		"author": { '@id' : "/api/users/Rick"},
		"date": 43214124
	},

	{
		"ride": { '@id' : "/api/rides/MaastrichtBruxelles"},
		"message": "Bonjour! Je serais un petit peu en retard ou?",
		"author": { '@id' : "/api/users/PB"},
		"date": 43214124
	},

	{
		"ride": { '@id' : "/api/rides/MaastrichtBruxelles"},
		"message": "Pas de soucis, PB! :)",
		"author": { '@id' : "/api/users/Moe"},
		"date": 43214124
	},

	{
		"ride":  { '@id' : "/api/rides/BruxellesLiege" },
		"message": "Pourquoi personne ne veut que je conduise?",
		"author":  { '@id' : "/api/users/Louise" },
		"date": 43214124
	}
]

export { MessagesMock };
