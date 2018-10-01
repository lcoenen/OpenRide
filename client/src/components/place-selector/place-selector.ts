import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { ViewController } from 'ionic-angular';


import { Point, Feature } from 'geojson';

import { NominatimProvider, NominatimToGeoJSON, GeoJSONCenter } from '../../providers/nominatim/nominatim';
import { AutoCompleteComponent } from 'ionic2-auto-complete';

import L from "leaflet";

/**
* Generated class for the PlaceSelectorComponent component.
*
* See https://angular.io/api/core/Component for more info on Angular
* Components.
*/
@Component({
selector: 'place-selector',
templateUrl: 'place-selector.html'
})
export class PlaceSelectorComponent {

	@Input() place: Feature<Point>;
	@Output() placeChange: EventEmitter<Feature<Point>> = new EventEmitter<Feature<Point>>();
 
	public address: any;
	public center: number[];
	public zoom: number;
	public layers: any[] = [];
	public map_options: object = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 5,
		center: [42.044355, -74.1185505] // NYC
	
		};

	@ViewChild('searchbar')
	searchbar: AutoCompleteComponent;

  constructor(
		public viewCtrl: ViewController,
		public nominatimProvider: NominatimProvider) {
	
		}

	ionViewDidLoad() {

		// Place the map on the center
		this.center = GeoJSONCenter(this.place);

	}

	itemSelected(selection: any) {

		this.center = [selection.lat, selection.lon];
		this.zoom = 14;
		this.layers = [L.marker(selection.lat, selection.lon)]; // Why am I replacing the layers?

		this.address = selection;
		this.placeChange.emit(NominatimToGeoJSON(selection));

	}
							
}
