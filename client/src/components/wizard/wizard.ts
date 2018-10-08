import { Component, ContentChild, ContentChildren, QueryList, Input } from '@angular/core';

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
	@Input() type: RideType;

	@Input() mode: EditMode;

	@ContentChild(Slides) slides: Slides;
	@ContentChildren(WizardPageComponent)	wizardPages: QueryList<WizardPageComponent>;


  constructor() {
  }

	ngAfterViewInit() {

		// Show the first page

		this.wizardPages.first.shown = true;
		this.slides.update()

		// Everytime something change on a page

		this.wizardPages.map((page: WizardPageComponent, index: number) => 

			page.changed.subscribe(() => { 

				// Show the next page if the linked value is defined
					(index < this.wizardPages.length - 1)? 
					(this.wizardPages.toArray()[index + 1].shown = page.is_defined(), 
					this.slides.update()) : undefined
					
				}

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

		if(this.slides._slides === undefined) return true;

		return !this.slides.isBeginning();

	}

	/*
	 *
	 * The next button will be shown if it's not the last slide
	 * 
	*/
	get showNext() {

		if(this.slides._slides === undefined) return true;

		return !this.slides.isEnd()

	}

	/*
	 *
	 * The last button will be shown if every slide have been shown
	 *
	 */
	get showLast() {

		if(this.slides._slides === undefined) return true;

		let show = this.wizardPages.reduce(((defined: boolean, page: WizardPageComponent) =>  {
			
				return defined && page.linked !== undefined

			}), true)

		return show;

	}

}
