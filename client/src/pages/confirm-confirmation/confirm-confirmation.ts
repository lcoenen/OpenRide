import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ConfirmConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-confirmation',
  templateUrl: 'confirm-confirmation.html',
})
export class ConfirmConfirmationPage {

	constructor(public navCtrl: NavController, 
		public viewCtrl: ViewController,
		public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmConfirmationPage');
  }

	cancel() {

		this.viewCtrl.dismiss(false);

	}

	confirm() {

		this.viewCtrl.dismiss(true);

	}

}
