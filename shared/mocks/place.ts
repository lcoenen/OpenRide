import { Feature, Point } from 'geojson' ;

export let PlacesMock: Feature<Point>[] = [
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.641584,5.563962],
		},
		'properties': {
			'address': '70 Rue Jonfosse, Liege, BE'
		}
	},
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.64897, 5.586938],
		},
		'properties': {
			'address': 'Rue Maghin 32, Liege, BE'
		}
	},
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.853252,5.691080],
		},
		'properties': {
			'address': 'Hochterpoort 43, Maastricht, NL'
		}
	},
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.851241,4.372411],
		},
		'properties': {
			'address': 'Rue de la commune, 23, Saint-Josse, BE'
		}
	},
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.362527,3.524071],
		},
		'properties': {
			'address': 'Rue derrière Espies, Valencienne, FR'
		}
	},
	{
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [50.83323, 4.309065],
		},
		'properties': {
			'address': 'Rue Joseph Pavez, 21, Bruxelles, BE'
		}
	}
]

