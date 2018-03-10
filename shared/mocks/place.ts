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
			'coordinates': [5.586938,50.648977],
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
			'coordinates': [50.939612,6.952869],
		},
		'properties': {
			'address': 'Elstergasse 3, Koln, DE'
		}
	},
]

