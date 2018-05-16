webpackJsonp([4],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsersProvider = /** @class */ (function () {
    function UsersProvider(afAuth, afs) {
        var _this = this;
        this.afAuth = afAuth;
        this.afs = afs;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    UsersProvider.prototype.signInWithEmail = function (credentials) {
        var _this = this;
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(function () {
            _this.usuarioCollection = _this.afs.collection('Usuarios');
            _this.usuarios = _this.usuarioCollection.valueChanges();
            _this.usuarioCollection.doc(credentials.email).ref.get().then(function (doc) {
                if (doc.exists) {
                    _this.userDB = doc.data();
                    console.log("Document data:", _this.userDB);
                }
                else {
                    console.log("No such document!");
                }
            });
        });
    };
    UsersProvider.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return;
        }
        else {
            return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        }
    };
    UsersProvider.prototype.autentificar = function () {
        return this.user && this.user.email;
    };
    UsersProvider.prototype.getUser = function () {
        return this.userDB;
    };
    UsersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], UsersProvider);
    return UsersProvider;
}());

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_users__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, afs, popOut, http, user) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.popOut = popOut;
        this.http = http;
        this.user = user;
        this.leccion_url = '/leccion.html';
        this.maestro_url = '/maestro.html';
    }
    HomePage.prototype.irAnadir = function () {
        this.navCtrl.push('AnadirLeccionPage');
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.leccionCollection = this.afs.collection('Lecciones');
        this.users = this.leccionCollection.valueChanges();
        this.leccionCollection.snapshotChanges().subscribe(function (Leccions) {
            Leccions.forEach(function (Leccion) {
                //console.log(Leccion.payload.doc._document.data.internalValue.get('tipoLeccion').internalValue)
            });
        });
    };
    HomePage.prototype.onLoad = function () {
        console.log(this.user.getUser());
    };
    HomePage.prototype.irLeccion = function (id) {
    };
    HomePage.prototype.Info = function (titulo, description) {
        var alert = this.popOut.create({
            title: titulo,
            subTitle: description,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>\n      Home\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding color="light">\n  <div text-right>\n    <button ion-button round color="secondary" (click)="irAnadir()">Añadir Leccion</button>\n  </div>\n    <ion-item no-lines *ngFor="let leccion of users | async">\n      <div text-center>\n        <ion-row>\n          <ion-col col-3>\n          </ion-col>\n          <ion-col>\n            <a [href]="leccion_url + \'?nombre=\' + leccion.nombre">\n              <button ion-button large icon-only class="icono" [ngStyle]="{\'background-color\': leccion.color}" (press)="Info(leccion.nombre, leccion.descripcion)" (click)="irLeccion(leccion.nombre)" type="submit">\n                <img src={{leccion.imagen}} width="90%"/>\n              </button>\n            </a>\n          </ion-col>\n          <ion-col col-3>\n          </ion-col>\n        </ion-row>\n      </div>\n      <ion-row>\n        <ion-col></ion-col>\n        <ion-col><p class=\'titulo\'>{{leccion.nombre}}</p></ion-col>\n        <ion-col></ion-col>\n      </ion-row>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_users_users__["a" /* UsersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_users_users__["a" /* UsersProvider */]) === "function" && _e || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_users_users__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(184);
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
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LogInPage = /** @class */ (function () {
    function LogInPage(navCtrl, auth, Loading, alert) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.Loading = Loading;
        this.alert = alert;
        this.loginData = { correo: '', contrasena: '' };
    }
    LogInPage.prototype.createAccount = function () {
        this.navCtrl.push('RegisterPage');
    };
    LogInPage.prototype.IniciarSesion = function () {
        var _this = this;
        var loading = this.Loading.create({ content: "Iniciando sesion, por favor espere..." });
        loading.present();
        var credentials = {
            email: this.loginData.correo,
            password: this.loginData.contrasena
        };
        console.log(credentials);
        this.auth.signInWithEmail(credentials)
            .then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }, function (error) {
            var alert = _this.alert.create({
                title: 'Error',
                subTitle: 'Correo o Contraseña incorrectas, vuelva a intentarlo',
                buttons: ['OK']
            });
            alert.present();
            console.log("error");
        }).then(function () {
            loading.dismiss();
        });
    };
    LogInPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LogInPage');
    };
    LogInPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-log-in',template:/*ion-inline-start:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/log-in/log-in.html"*/'<!--\n  Generated template for the LogInPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>Iniciar Sesión</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form (submit)="IniciarSesion()">\n    <ion-item>\n      <ion-label stacked>Correo</ion-label>\n      <ion-input [(ngModel)]="loginData.correo" name="correo" type="text" placeholder="Correo" ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Contraseña</ion-label>\n      <ion-input [(ngModel)]="loginData.contrasena" name="contrasena" type="password" placeholder="Contraseña" ></ion-input>\n    </ion-item>\n    <button color="secondary" style="color:#fff;" ion-button block type="submit">\n      Login\n    </button>\n  </form>\n  <button color="secondary" ion-button class="register-btn" block clear (click)="createAccount()">\n    Crear nuevo usuario\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/log-in/log-in.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_users_users__["a" /* UsersProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LogInPage);
    return LogInPage;
}());

//# sourceMappingURL=log-in.js.map

/***/ }),

/***/ 196:
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
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/anadir-leccion/anadir-leccion.module": [
		549,
		0
	],
	"../pages/leccion/leccion.module": [
		550,
		3
	],
	"../pages/log-in/log-in.module": [
		551,
		2
	],
	"../pages/register/register.module": [
		552,
		1
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
webpackAsyncContext.id = 239;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnadirProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the AnadirProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AnadirProvider = /** @class */ (function () {
    function AnadirProvider(http) {
        this.http = http;
        console.log('Hello AnadirProvider Provider');
    }
    AnadirProvider.prototype.ree = function (s) {
        console.log(s);
    };
    AnadirProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AnadirProvider);
    return AnadirProvider;
}());

//# sourceMappingURL=anadir.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeccionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
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
 * Generated class for the LeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeccionPage = /** @class */ (function () {
    function LeccionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.html = navParams.get('html');
        this.hola = '<h1>asdasdasdasd</h1>';
    }
    LeccionPage.prototype.ionViewDidLoad = function () {
        console.log(this.html);
        console.log('ionViewDidLoad LeccionPage');
    };
    LeccionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-leccion',template:/*ion-inline-start:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/leccion/leccion.html"*/'<!--\n  Generated template for the LeccionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>leccion</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<span [innerHTML]="html">\n\n</span>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/Documents/UVG/Pianerino/src/pages/leccion/leccion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], LeccionPage);
    return LeccionPage;
}());

//# sourceMappingURL=leccion.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_log_in_log_in__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_leccion_leccion__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_users_users__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_anadir_anadir__ = __webpack_require__(347);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_log_in_log_in__["a" /* LogInPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_leccion_leccion__["a" /* LeccionPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/anadir-leccion/anadir-leccion.module#AnadirLeccionPageModule', name: 'AnadirLeccionPage', segment: 'anadir-leccion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leccion/leccion.module#LeccionPageModule', name: 'LeccionPage', segment: 'leccion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/log-in/log-in.module#LogInPageModule', name: 'LogInPage', segment: 'log-in', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_10__config__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__["b" /* AngularFirestoreModule */].enablePersistence()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_log_in_log_in__["a" /* LogInPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_leccion_leccion__["a" /* LeccionPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuth */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__providers_users_users__["a" /* UsersProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_anadir_anadir__["a" /* AnadirProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
//firebase credenciales
var firebaseConfig = {
    apiKey: "AIzaSyBEC03gubW1gl-v2i26xJr1vxsmCnQl_RI",
    authDomain: "pianerino.firebaseapp.com",
    databaseURL: "https://pianerino.firebaseio.com",
    projectId: "pianerino",
    storageBucket: "pianerino.appspot.com",
    messagingSenderId: "7147492081"
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_log_in_log_in__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_log_in_log_in__["a" /* LogInPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/rodrigo/Documents/UVG/Pianerino/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/rodrigo/Documents/UVG/Pianerino/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[349]);
//# sourceMappingURL=main.js.map