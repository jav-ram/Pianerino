webpackJsonp([1],{

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(554);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_users_users__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = /** @class */ (function () {
    function RegisterPage(nav, auth, alertCtrl, afs, Loading) {
        this.nav = nav;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.afs = afs;
        this.Loading = Loading;
        this.createSuccess = false;
        this.registerCredentials = { email: '', password: '' };
        this.usuario = {
            apellido: '',
            contraseña: '',
            correo: '',
            nombre: '',
            puntos: 0,
            tipoUsuario: 0
        };
    }
    RegisterPage.prototype.ionViewWillEnter = function () {
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        var loading = this.Loading.create({ content: "Creando su cuenta, por favor espere..." });
        loading.present();
        this.auth.register(this.registerCredentials).then(function (success) {
            if (_this.registerCredentials.password != _this.password) {
                _this.showPopup("Error", "No es la misma contraseña");
                loading.dismiss();
            }
            else {
                if (success) {
                    _this.createSuccess = true;
                    //guardar en base de datos
                    _this.usuario.correo = _this.registerCredentials.email;
                    _this.usuario.contraseña = _this.registerCredentials.password;
                    _this.usuario.puntos = 0;
                    _this.usuario.tipoUsuario = 0;
                    console.log(_this.usuario);
                    _this.afs.collection('Usuarios').doc(_this.usuario.correo)
                        .set(_this.usuario)
                        .then(function () {
                        loading.dismiss();
                        _this.nav.pop();
                        _this.showPopup("Cuenta creada!", "Su cuenta a sido creada con exito.");
                        var alert = _this.alertCtrl.create({
                            title: "Cuenta creada!",
                            subTitle: "Su cuenta a sido creada con exito.",
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
                        });
                        alert.present();
                    });
                }
                else {
                    _this.showPopup("Error", "Hubo problema creando la cuenta.");
                }
            }
        }, function (error) {
            _this.showPopup("Error", error);
        });
    };
    RegisterPage.prototype.showPopup = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\Javier\Desktop\Pianerino\src\pages\register\register.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>Crear Usuario</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="login-content" padding>\n\n  <div class="login-box">\n\n\n\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n\n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Nombre de Usuario" name="usuario" [(ngModel)]="nombreUsuario" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Nombre" name="nombre" [(ngModel)]="usuario.nombre" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Apellido" name="apellido" [(ngModel)]="usuario.apellido" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Correo" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Contraseña" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Vuelva a ingresar contraseña" name="password" [(ngModel)]="password" required></ion-input>\n\n            </ion-item>\n\n\n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button color="secondary" style="color:#fff;" ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">\n\n            Crear usuario\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Javier\Desktop\Pianerino\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_users_users__["a" /* UsersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_users_users__["a" /* UsersProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _e || Object])
    ], RegisterPage);
    return RegisterPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=1.js.map