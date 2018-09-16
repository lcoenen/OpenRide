import { Component, ContentChild, ViewChildren, QueryList, Input, EventEmitter } from '@angular/core';

import { Slides } from 'ionic-angular';

import { WizardPageComponent } from '../wizard-page/wizard-page';

import { EditMode } from '../../providers/ride/ride';

/**
 * Generated class for the WizardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wizard',
  templateUrl: 'wizard.html'
})
export class WizardComponent {

	private _next: boolean;

	@Input() mode: EditMode;

	@ContentChild(Slides) slides: Slides;
	@ViewChildren(WizardPageComponent)	wizardPages: QueryList<WizardPageComponent>;


  constructor() {
  }

	ngAfterViewInit() {

		this.slides.lockSwipeToNext(true);
		this.wizardPages.map((page: WizardPageComponent) => {

			page.changed.subscribe(this.refresh_allow_next);

		})

	}

	/*
	 *
	 * This will come back to the previous page
	 *
	 */
	previous() {

		this.slides.slidePrev();

		this.refresh_allow_next()

	}

	/*
	 *
	 *	This will pass to the next page if something have been changed
	 *
	 */
	next() { 

		this.slides.slideNext();

		this.refresh_allow_next()

	}

	isFirst(){

		return this.slides.isBeginning()

	}

	isLast(){

		return !this._next || this.slides.isEnd()

	}

	isValid(){

		return this.slides.isEnd()

	}

	/*
	 *
	 * This will check if the next button can be shown when creating a ride
	 *
	*/
	refresh_allow_next(){

		let page = this.slides.getActiveIndex() 
		
		// Always allow in edit mode
		let allow_next = this.mode == EditMode.EDIT;

		// Check that current page property is defined

		let current_page_defined = this.wizardPages.toArray()[page].linked != undefined;

		allow_next = allow_next || current_page_defined;	

		this._next = allow_next;
		this.slides.lockSwipeToNext(!allow_next) 

	}

}
