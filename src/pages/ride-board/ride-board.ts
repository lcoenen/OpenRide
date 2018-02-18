import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RideBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ride-board',
  templateUrl: 'ride-board.html',
})
export class RideBoardPage {

  boardpage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.boardpage = 'riders';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideBoardPage');
  }

}
