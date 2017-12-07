import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddressModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-modal',
  templateUrl: 'address-modal.html',
})
export class AddressModalPage {

  private address:string;

  constructor(
      public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressModalPage');
  }

  pick(){
    console.log('Address is ');
    console.log(this.address);

    this.viewCtrl.dismiss({address: this.address});

  }

  cancel(){
    this.viewCtrl.dismiss({address: undefined});   
  }

}
