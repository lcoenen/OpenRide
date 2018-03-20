import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AutoCompleteService } from 'ionic2-auto-complete';

import 'rxjs/add/operator/map'

import { Feature, Point } from 'geojson' ;


/*
	Generated class for the NominatimProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
 */

const nominatimUrl:string = 'https://nominatim.openstreetmap.org/search?q=SEARCH&format=json';

@Injectable()
export class NominatimProvider implements AutoCompleteService {


	labelAttribute = "display_name";
	formValueAttribute = '';

	constructor(public http: HttpClient) {
		console.log('Hello NominatimProvider Provider');
	}

	getResults(address: string){

		console.log(`Trying to find ${ address }`)
		console.log(`of type ${ typeof address }`)
		let searchUrl: string = nominatimUrl.replace('SEARCH', address)
		return this.http.get(searchUrl)
			.map((result) => {

				// return result.json();
				return result;

			})

	}

}

export function NominatimToGeoJSON(nominatimAnswer: any) : Feature<Point> {

 return {

		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': [Number(nominatimAnswer.lat), Number(nominatimAnswer.lon)]
		},
		'properties': {
			'address': nominatimAnswer.display_name 
		}

 }

}
