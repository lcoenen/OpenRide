
/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ModalController, NavParams, IonicPage, NavController } from 'ionic-angular';

import { Component } from '@angular/core';
// import { Input, OnChanges, SimpleChange } from '@angular/core';

import { OfferInvitePage } from '../offer-invite/offer-invite'; 

import { AddressModalPage } from '../address-modal/address-modal'; 

import { RidersProvider } from '../../providers/riders/riders';

enum PayementPhilosophy {

FREE,
PART,
REFUNDED, 
PAID

}

@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferRidePage  {

  public philosophy: PayementPhilosophy;

  private _destination: string;
  private _origin: string;
  private _riding_time: string;
  private _payement: string;

  private _next: boolean;

  public destination_address: string;
  public origin_address: string;

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
				public modalCtrl: ModalController,
				public ridersProvider: RidersProvider) {
		this.philosophy = 0;
    this._next = false;
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
    console.log('ionViewDidLoad OfferridePage');

  }

  @ViewChild(Slides) slides: Slides;

  previous() {
  
    this.slides.slidePrev();

    this.refresh_allow_next()

  }

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

  refresh_allow_next(){

    let page = this.slides.getActiveIndex() 

    const relevant_vars: string[] = [
      'destination',
      'origin',
      'riding_time',
      'payement'
    ]

    console.log(relevant_vars[page]);
    console.log(this[relevant_vars[page]]);
    
    let allow_next: boolean = this[relevant_vars[page]] != undefined;

    this._next = allow_next;
    this.slides.lockSwipeToNext(!allow_next) 
    console.log('this._next', this._next);

  }

  address_modal(){

    console.log('Address modal')

  }

  set destination(theDestination: string){

    if(theDestination == 'address'){

      let addressModal = this.modalCtrl.create(AddressModalPage);
      addressModal.onDidDismiss(data => {
        this.destination_address = data.address
      });
      addressModal.present();

    }

    this._destination = theDestination
    this.refresh_allow_next()

  }

  get destination(): string {

    return this._destination

  }

  set origin(theOrigin: string){

    if(theOrigin == 'address'){

      let addressModal = this.modalCtrl.create(AddressModalPage);
      addressModal.onDidDismiss(data => {
        this.origin_address = data.address
      });
      addressModal.present();

    }

    this._origin = theOrigin
    this.refresh_allow_next()

  }

  get origin(): string {

    return this._origin

  }

  set riding_time(theRidingTime: string){

    this._riding_time = theRidingTime
    this.refresh_allow_next()

  }

  get riding_time(): string {

    return this._riding_time

  }


  set asap(theAsap: boolean){

    if(theAsap)
      this.riding_time = 'asap';
    else
      this.riding_time = '';
  }



  get asap(): boolean {

    return this.riding_time == 'asap';

  }

  set payement(thePayement: string){

    this._payement = thePayement
    this.refresh_allow_next()


    const _boundaries = {
     
      10: PayementPhilosophy.FREE,
      40: PayementPhilosophy.PART,
      60: PayementPhilosophy.REFUNDED,
      80: PayementPhilosophy.PAID
      
    }
    
    for (let i in _boundaries) {

      let boundary = _boundaries[i];
      
      if(thePayement > i)
        this.philosophy = boundary;

    }

  }

  get payement(): string {

    return this._payement

  }

  valid() {
 		
		// this.ridersProvider.offer_ride({

		// 	origin: this.origin,
		// 	destination: this.destination,
		// 	riding_time: this.riding_time,
		// 	payement: this.payement,
		// 	riders: []

		// });

    this.navCtrl.push(OfferInvitePage);
  
  }

}
