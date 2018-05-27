webpackJsonp([0],{

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioPageModule", function() { return UsuarioPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__usuario__ = __webpack_require__(558);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UsuarioPageModule = /** @class */ (function () {
    function UsuarioPageModule() {
    }
    UsuarioPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__usuario__["a" /* UsuarioPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__usuario__["a" /* UsuarioPage */]),
            ],
        })
    ], UsuarioPageModule);
    return UsuarioPageModule;
}());

//# sourceMappingURL=usuario.module.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_users_users__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(187);
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
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsuarioPage = /** @class */ (function () {
    function UsuarioPage(navCtrl, navParams, afs, user, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.user = user;
        this.http = http;
    }
    UsuarioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UsuarioPage');
        console.log(this.user.getUser());
        this.users = this.user.getUser();
        console.log(this.users);
        //halp();
    };
    UsuarioPage.prototype.name = function () {
        return this.user.getUser().nombre;
    };
    UsuarioPage.prototype.apellido = function () {
        return this.user.getUser().apellido;
    };
    UsuarioPage.prototype.puntos = function () {
        return this.user.getUser().puntos;
    };
    UsuarioPage.prototype.tipo = function () {
        return this.user.getUser().tipoUsuario.tipo;
    };
    UsuarioPage.prototype.correo = function () {
        return this.user.getUser().correo;
    };
    UsuarioPage.prototype.usuario = function () {
        return this.user.getUser().usuario;
    };
    UsuarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-usuario',template:/*ion-inline-start:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/usuario/usuario.html"*/'<!--\n  Generated template for the UsuarioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>Usuario</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding color=\'light\'>\n	<ion-list>\n    <ion-item class="item">\n      <ion-label id="text">Usuario</ion-label>\n      <ion-input type="text" id="text" disabled="true" value="{{usuario()}}"></ion-input>\n    </ion-item>\n\n		<ion-item class="item">\n      <ion-label id="text">Nombre</ion-label>\n      <ion-input type="text" id="text" disabled="true" value="{{name()}}  {{apellido()}}"></ion-input>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label id="text">Correo</ion-label>\n      <ion-input type="text" id="text" disabled="true" value="{{correo()}}"></ion-input>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label id="text">Puntos</ion-label>\n      <ion-input type="text" id="text" disabled="true" value="{{puntos()}}"></ion-input>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label id="text">Tipo de Usuario</ion-label>\n      <ion-input type="text" id="text" disabled="true" value="{{tipo()}}"></ion-input>\n    </ion-item>\n\n	</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/usuario/usuario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_3__providers_users_users__["a" /* UsersProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
    ], UsuarioPage);
    return UsuarioPage;
}());

//# sourceMappingURL=usuario.js.map

/***/ })

});
//# sourceMappingURL=0.js.map