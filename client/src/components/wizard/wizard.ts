import { Component, ContentChild, ContentChildren, QueryList, Input, EventEmitter } from '@angular/core';

import { Slides } from 'ionic-angular';

import { WizardPageComponent } from '../wizard-page/wizard-page';

import { EditMode } from '../../providers/ride/ride';

import { RideType } from 'shared/models/ride'

/**
 * Generated class for the WizardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wizard',
	templateUrl: 'wizard.html',
	providers: [Slides]
})
export class WizardComponent {

	public RideType: any = RideType;

	@Input() mode: EditMode;

	@ContentChild(Slides) slides: Slides;
	@ContentChildren(WizardPageComponent)	wizardPages: QueryList<WizardPageComponent>;


  constructor() {
  }

	ngAfterViewInit() {

		//this.slides.lockSwipeToNext(true);

		// Show the first page

		this.wizardPages.first.shown = true;

		// Everytime something change on a page

		this.wizardPages.map((page: WizardPageComponent, index: number) => 

			page.changed.subscribe(() =>  

				// Show the next page if the linked value is defined
				this.wizardPages.toArray()[index + 1].shown = page.linked !== undefined, 
				this.slides.update()

			)

		)

	}

	/*
	 *
	 * This will come back to the previous page
	 *
	 */
	previous() {

		this.slides.slidePrev();

	}

	/*
	 *
	 *	This will pass to the next page if something have been changed
	 *
	 */
	next() { 

		this.slides.slideNext();

	}

	/*
	 * 
	 * The back button will be shown if it's not the first slide
	 *
	*/
	get showBack() {

		return !this.slides.isBeginning();

	}

	/*
	 *
	 * The next button will be shown if it's not the last slide
	 * 
	*/
	get showNext() {

		return !this.slides.isEnd()

	}

	/*
	 *
	 * The last button will be shown if every slide have been shown
	 *
	 */
	get showLast() {

		return this.slides.length() == this.wizardPages.length 

	}

}
