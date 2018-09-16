import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PayementPhilosophy } from '../../../../shared/models/ride';

const _boundaries = [10, 40, 60, 80]

/*

const _boundaries = {

	10: PayementPhilosophy.FREE,
	40: PayementPhilosophy.PART,
	60: PayementPhilosophy.REFUNDED,
	80: PayementPhilosophy.PAID

}

*/


/**
* Generated class for the PayementSelectorComponent component.
*
* See https://angular.io/api/core/Component for more info on Angular
* Components.
*/
@Component({
selector: 'payement-selector',
templateUrl: 'payement-selector.html'
})
export class PayementSelectorComponent {

	@Input() payement: number;

	@Output() payementChange: EventEmitter<number> = new EventEmitter<number>();

	public philosophy: PayementPhilosophy = 0;

	public PayementPhilosophy: any;

	constructor() {

		this.PayementPhilosophy = PayementPhilosophy;

	}

	refreshPayement(thePayement: number) {

		/* TW ugly code */

		for (let i = 0; i < 4; i++) {

			let boundary: number = _boundaries[i]

			if(thePayement > boundary) {

				this.philosophy = i;

			}

		}

	}

}
