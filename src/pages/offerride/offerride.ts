import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferRidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferridePage');
  }

  @ViewChild(Slides) slides: Slides;

  previous() {
  
    this.slides.slidePrev();

  }

  next() {
  
    this.slides.slideNext();

  }

  isFirst(){

    return this.slides.isBeginning()

  }


  isLast(){

    return this.slides.isEnd()

  }

  isValid(){
  
    return this.slides.isEnd()
  
  }

}
