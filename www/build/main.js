webpackJsonp([4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestRidePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RequestRidePage = (function () {
    function RequestRidePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    RequestRidePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requestride',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/requestride/requestride.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Request a ride</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<p>This is the request a ride page!</p>\n\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/requestride/requestride.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], RequestRidePage);
    return RequestRidePage;
}());

//# sourceMappingURL=requestride.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AddressModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddressModalPage = (function () {
    function AddressModalPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    AddressModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddressModalPage');
    };
    AddressModalPage.prototype.pick = function () {
        console.log('Address is ');
        console.log(this.address);
        this.viewCtrl.dismiss({ address: this.address });
    };
    AddressModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss({ address: undefined });
    };
    AddressModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-address-modal',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/address-modal/address-modal.html"*/`<!--\n  Generated template for the AddressModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Pick an address</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-item>\n    <ion-label fixed>Address:</ion-label>\n    <ion-input name="address" [(ngModel)]="address" type="text"></ion-input>\n  </ion-item>\n\n<button ion-button (click)="pick()">Pick</button>\n\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/address-modal/address-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], AddressModalPage);
    return AddressModalPage;
}());

//# sourceMappingURL=address-modal.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferInvitePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rider_mock__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ride_board_ride_board__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the OfferInvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OfferInvitePage = (function () {
    function OfferInvitePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.riders = __WEBPACK_IMPORTED_MODULE_2__rider_mock__["a" /* RidersMockData */];
        console.log(this.riders);
    }
    OfferInvitePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OfferInvitePage');
    };
    OfferInvitePage.prototype.continue = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ride_board_ride_board__["a" /* RideBoardPage */]);
    };
    OfferInvitePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-offer-invite',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/offer-invite/offer-invite.html"*/`<!--\n  Generated template for the OfferInvitePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Invite people to your ride!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-card *ngFor="let rider of riders">\n  <ion-item>\n    <ion-avatar item-start>\n      <img src="assets/imgs/avatar_{{rider.id}}.png">\n    </ion-avatar>\n    <h2>{{rider.name}}</h2>\n    <p>{{rider.age}} years old, from {{rider.place_of_origin}}</p>\n  </ion-item>\n\n  <ion-card-content>\n\n  <p>From {{rider.origin}} to {{rider.destination}}</p>\n  <p>{{rider.riding_time}}</p>\n  \n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button icon-left clear small>\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>Invite</div>\n      </button>\n    </ion-col>\n    <ion-col center text-center>\n      <ion-note>\n        Reputation: \n	<ion-badge item-end>{{rider.reputation}}</ion-badge>\n      </ion-note>\n    </ion-col>\n  </ion-row>\n\n</ion-card>\n</ion-content>\n\n	<ion-footer>\n		<ion-toolbar>\n					<ion-buttons end>\n							<button (click)="continue()" ion-button icon-right color="royal">\n							Continue\n							<ion-icon name="arrow-forward"></ion-icon>\n							</button>	\n					</ion-buttons>\n		</ion-toolbar>\n	</ion-footer>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/offer-invite/offer-invite.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], OfferInvitePage);
    return OfferInvitePage;
}());

//# sourceMappingURL=offer-invite.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RideBoardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RideBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RideBoardPage = (function () {
    function RideBoardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.boardpage = 'riders';
    }
    RideBoardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RideBoardPage');
    };
    RideBoardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ride-board',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/ride-board/ride-board.html"*/`<!--\n  Generated template for the RideBoardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>RideBoard</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n \n  <ion-segment [(ngModel)]="boardpage">\n    <ion-segment-button value="summary">\n      Summary\n    </ion-segment-button>\n    <ion-segment-button value="riders">\n      Riders\n    </ion-segment-button>\n    <ion-segment-button value="chat">\n      Chat <ion-badge color="primary">3</ion-badge>\n    </ion-segment-button>\n  </ion-segment>\n\n\n	<div [ngSwitch]="boardpage">\n	  <div *ngSwitchCase="\'summary\'">\n\n	  From Paris to Berlin,\n	  In a few weeks\n\n	  </div>\n\n	  <div *ngSwitchCase="\'riders\'">\n\n	  Machin\n\n	  </div>\n	<div *ngSwitchCase="\'chat\'">\n          Hey ca va?\n	\n	</div>\n	</div>\n\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/ride-board/ride-board.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object])
    ], RideBoardPage);
    return RideBoardPage;
    var _a, _b;
}());

//# sourceMappingURL=ride-board.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/address-modal/address-modal.module": [
		279,
		3
	],
	"../pages/offer-invite/offer-invite.module": [
		280,
		2
	],
	"../pages/offerride/offerride.module": [
		281,
		1
	],
	"../pages/ride-board/ride-board.module": [
		282,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__requestride_requestride__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__offerride_offerride__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.request_a_ride = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__requestride_requestride__["a" /* RequestRidePage */]);
    };
    HomePage.prototype.offer_a_ride = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__offerride_offerride__["a" /* OfferRidePage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/home/home.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Openride</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card (click)="offer_a_ride()">\n    <img src="assets/imgs/offer_a_ride.png"/>\n    <div class="card-title">Offer a ride</div>\n    <div class="card-subtitle">23 riders looking for a ride</div>\n  </ion-card>\n\n  <ion-card (click)="request_a_ride()">\n    <img src="assets/imgs/request_a_ride.png"/>\n    <div class="card-title">Request a ride</div>\n    <div class="card-subtitle">45 drivers looking for riders</div>\n  </ion-card>\n\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/list/list.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_requestride_requestride__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_offerride_offerride__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_address_modal_address_modal__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_offer_invite_offer_invite__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_ride_board_ride_board__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_requestride_requestride__["a" /* RequestRidePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_offerride_offerride__["a" /* OfferRidePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_address_modal_address_modal__["a" /* AddressModalPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_offer_invite_offer_invite__["a" /* OfferInvitePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_ride_board_ride_board__["a" /* RideBoardPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/address-modal/address-modal.module#AddressModalPageModule', name: 'AddressModalPage', segment: 'address-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offer-invite/offer-invite.module#OfferInvitePageModule', name: 'OfferInvitePage', segment: 'offer-invite', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offerride/offerride.module#OfferRidePageModule', name: 'OfferRidePage', segment: 'offerride', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ride-board/ride-board.module#RideBoardPageModule', name: 'RideBoardPage', segment: 'ride-board', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_requestride_requestride__["a" /* RequestRidePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_offerride_offerride__["a" /* OfferRidePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_address_modal_address_modal__["a" /* AddressModalPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_offer_invite_offer_invite__["a" /* OfferInvitePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_ride_board_ride_board__["a" /* RideBoardPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RidersMockData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rider__ = __webpack_require__(252);

var RidersMockData = [
    new __WEBPACK_IMPORTED_MODULE_0__rider__["a" /* Rider */]('Marc', 'Marc Janbon', '22', 'Dirty Village', '22 Dirty street, Dirty Village', '45 Dirtier street, Paris', 'Tomorrow 23:32', '12'),
    new __WEBPACK_IMPORTED_MODULE_0__rider__["a" /* Rider */]('Stephane', 'Stephane Dujean', '43', 'Hellroad', '43 Concil street, Dirty Village', '20 Champs Elizee, Paris', 'Tomorrow 12:22', '54'),
    new __WEBPACK_IMPORTED_MODULE_0__rider__["a" /* Rider */]('Rick', 'Rick Duboi', '34', 'Dirty Village', '312 Nextroad, Beside place', '323 Event street, St-Germain', 'In two days, 9:32', '43'),
    new __WEBPACK_IMPORTED_MODULE_0__rider__["a" /* Rider */]('Eric', 'Eric Glandu', '12', 'Angel Paradise', '34 Law street, Dirty Village', '434, Rue du harcelement, Paris', 'Tomorrow 4:00', '92')
];

//# sourceMappingURL=rider-mock.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rider; });
var Rider = (function () {
    function Rider(id, name, age, place_of_origin, origin, destination, riding_time, reputation) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.place_of_origin = place_of_origin;
        this.origin = origin;
        this.destination = destination;
        this.riding_time = riding_time;
        this.reputation = reputation;
        console.log("NEW RIDER", this.id);
    }
    return Rider;
}());

//# sourceMappingURL=rider.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_requestride_requestride__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_offerride_offerride__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'RequestRidePage', component: __WEBPACK_IMPORTED_MODULE_6__pages_requestride_requestride__["a" /* RequestRidePage */] },
            { title: 'OfferRidePage', component: __WEBPACK_IMPORTED_MODULE_7__pages_offerride_offerride__["a" /* OfferRidePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/app/app.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferRidePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offer_invite_offer_invite__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__address_modal_address_modal__ = __webpack_require__(101);
/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { Input, OnChanges, SimpleChange } from '@angular/core';


var PayementPhilosophy;
(function (PayementPhilosophy) {
    PayementPhilosophy[PayementPhilosophy["FREE"] = 0] = "FREE";
    PayementPhilosophy[PayementPhilosophy["PART"] = 1] = "PART";
    PayementPhilosophy[PayementPhilosophy["REFUNDED"] = 2] = "REFUNDED";
    PayementPhilosophy[PayementPhilosophy["PAID"] = 3] = "PAID";
})(PayementPhilosophy || (PayementPhilosophy = {}));
var OfferRidePage = (function () {
    function OfferRidePage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.philosophy = 0;
        this._next = false;
    }
    OfferRidePage.prototype.ionViewDidLoad = function () {
        this.slides.lockSwipeToNext(true);
        console.log('ionViewDidLoad OfferridePage');
    };
    OfferRidePage.prototype.previous = function () {
        this.slides.slidePrev();
        this.refresh_allow_next();
    };
    OfferRidePage.prototype.next = function () {
        this.slides.slideNext();
        this.refresh_allow_next();
    };
    OfferRidePage.prototype.isFirst = function () {
        return this.slides.isBeginning();
    };
    OfferRidePage.prototype.isLast = function () {
        return !this._next || this.slides.isEnd();
    };
    OfferRidePage.prototype.isValid = function () {
        return this.slides.isEnd();
    };
    OfferRidePage.prototype.refresh_allow_next = function () {
        var page = this.slides.getActiveIndex();
        var relevant_vars = [
            'destination',
            'origin',
            'riding_time',
            'payement'
        ];
        console.log(relevant_vars[page]);
        console.log(this[relevant_vars[page]]);
        var allow_next = this[relevant_vars[page]] != undefined;
        this._next = allow_next;
        this.slides.lockSwipeToNext(!allow_next);
        console.log('this._next', this._next);
    };
    OfferRidePage.prototype.address_modal = function () {
        console.log('Address modal');
    };
    Object.defineProperty(OfferRidePage.prototype, "destination", {
        get: function () {
            return this._destination;
        },
        set: function (theDestination) {
            var _this = this;
            if (theDestination == 'address') {
                var addressModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__address_modal_address_modal__["a" /* AddressModalPage */]);
                addressModal.onDidDismiss(function (data) {
                    _this.destination_address = data.address;
                });
                addressModal.present();
            }
            this._destination = theDestination;
            this.refresh_allow_next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfferRidePage.prototype, "origin", {
        get: function () {
            return this._origin;
        },
        set: function (theOrigin) {
            var _this = this;
            if (theOrigin == 'address') {
                var addressModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__address_modal_address_modal__["a" /* AddressModalPage */]);
                addressModal.onDidDismiss(function (data) {
                    _this.origin_address = data.address;
                });
                addressModal.present();
            }
            this._origin = theOrigin;
            this.refresh_allow_next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfferRidePage.prototype, "riding_time", {
        get: function () {
            return this._riding_time;
        },
        set: function (theRidingTime) {
            this._riding_time = theRidingTime;
            this.refresh_allow_next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfferRidePage.prototype, "asap", {
        get: function () {
            return this.riding_time == 'asap';
        },
        set: function (theAsap) {
            if (theAsap)
                this.riding_time = 'asap';
            else
                this.riding_time = '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfferRidePage.prototype, "payement", {
        get: function () {
            return this._payement;
        },
        set: function (thePayement) {
            this._payement = thePayement;
            this.refresh_allow_next();
            var _boundaries = {
                10: PayementPhilosophy.FREE,
                40: PayementPhilosophy.PART,
                60: PayementPhilosophy.REFUNDED,
                80: PayementPhilosophy.PAID
            };
            for (var i in _boundaries) {
                var boundary = _boundaries[i];
                if (thePayement > i)
                    this.philosophy = boundary;
            }
        },
        enumerable: true,
        configurable: true
    });
    OfferRidePage.prototype.valid = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__offer_invite_offer_invite__["a" /* OfferInvitePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], OfferRidePage.prototype, "slides", void 0);
    OfferRidePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-offerride',template:/*ion-inline-start:"/home/jt/Documents/code/current/OpenRide/src/pages/offerride/offerride.html"*/`<!--\nGenerated template for the OfferridePage page.\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\nIonic pages and navigation.\n-->\n<ion-header>\n\n	<ion-navbar>\n		<ion-title>Offer a ride</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-slides pager>\n\n  <ion-slide>\n    <img class="wizard_step_caption" src="assets/imgs/destination.png"/>\n    <h2>Destination</h2>\n    <ion-item>\n    <ion-label floating>Where are you going?</ion-label>\n    <ion-select [(ngModel)]="destination">\n      <ion-option value="here">Here</ion-option>\n      <ion-option value="address">Pick an address\n				<ion-icon name="arrow-dropdown" icon-right></ion-icon>\n				</ion-option>\n\n      <ion-option value="anywherenearby">Anywhere nearby</ion-option>\n    </ion-select>\n    </ion-item>\n\n    <p *ngIf="destination == \'address\'">You\'re going to {{destination_address}}</p>\n\n  </ion-slide>\n\n  <ion-slide>\n    <img class="wizard_step_caption" src="assets/imgs/origin.png"/>\n    <h2>Origin</h2>\n    <ion-item>\n	    <ion-label floating>From where will you depart?</ion-label>\n\n	    <ion-select [(ngModel)]="origin">\n	      <ion-option value="here">Here</ion-option>\n	      <ion-option (click)="address_modal()" value="address">Pick an address\n					<ion-icon name="arrow-dropdown" icon-right></ion-icon>\n					</ion-option>\n\n	      <ion-option value="anywherenearby">Anywhere nearby</ion-option>\n	    </ion-select>\n    </ion-item>\n\n    <p *ngIf="origin == \'address\'">You\'re going from {{origin_address}}</p>\n\n  </ion-slide>\n\n  <ion-slide>\n    <img class="wizard_step_caption" src="assets/imgs/riding_time.png"/>\n    <h2>Riding time</h2>\n\n    <ion-item>\n	    <ion-label>Do you want to ride ASAP?</ion-label>\n	    <ion-toggle [(ngModel)]="asap" checked="false"></ion-toggle>\n    </ion-item>\n\n    <ion-item *ngIf="!asap">\n         <ion-label floating>When will you ride?</ion-label>\n	 <ion-datetime displayFormat="DD MMM YYYY HH:mm" [(ngModel)]="riding_time"></ion-datetime>\n    </ion-item>\n\n  </ion-slide>\n\n  <ion-slide>\n    <img class="wizard_step_caption" src="assets/imgs/money.png"/>\n    <h2>Payement</h2>\n    <ion-item>\n	    <ion-label>How do you want to get paid?</ion-label>\n	    <ion-range [(ngModel)]="payement">\n		    <ion-icon range-left small name="cash"></ion-icon>\n		    <ion-icon range-right name="cash"></ion-icon>\n	  </ion-range>\n\n    </ion-item>\n    Amount: {{payement}} €\n\n    <p style="color: green;" *ngIf="philosophy == 0">It\'s free!</p>\n    <p style="color: yellow;" *ngIf="philosophy == 1">You\'re paying your part</p>\n    <p style="color: orange;" *ngIf="philosophy == 2">Your trip is refunded</p>\n    <p style="color: red" *ngIf="philosophy == 3">You\'re getting paid</p>\n  </ion-slide>\n\n</ion-slides>\n\n	<ion-footer>\n		<ion-toolbar>\n					<ion-buttons *ngIf="!isFirst()">\n							<button (click)="previous()" ion-button icon-left color="royal">\n							<ion-icon name="arrow-back"></ion-icon>\n							Back\n							</button>	\n					</ion-buttons>\n					<ion-buttons *ngIf="!isLast()" end>\n							<button (click)="next()" ion-button icon-right color="royal">\n								Next\n								<ion-icon name="arrow-forward"></ion-icon>\n							</button>	\n					</ion-buttons>\n\n					<ion-buttons *ngIf="isValid()" end>\n							<button (click)="valid()" ion-button icon-right color="royal">\n								Offer the ride	\n								<ion-icon name="send"></ion-icon>\n							</button>	\n					</ion-buttons>\n		</ion-toolbar>\n	</ion-footer>\n\n</ion-content>\n`/*ion-inline-end:"/home/jt/Documents/code/current/OpenRide/src/pages/offerride/offerride.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], OfferRidePage);
    return OfferRidePage;
}());

//# sourceMappingURL=offerride.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map