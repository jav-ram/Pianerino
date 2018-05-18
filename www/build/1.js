webpackJsonp([1],{

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnadirLeccionPageModule", function() { return AnadirLeccionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__anadir_leccion__ = __webpack_require__(555);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AnadirLeccionPageModule = /** @class */ (function () {
    function AnadirLeccionPageModule() {
    }
    AnadirLeccionPageModule.prototype.ionViewWillEnter = function () {
    };
    AnadirLeccionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__anadir_leccion__["a" /* AnadirLeccionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__anadir_leccion__["a" /* AnadirLeccionPage */]),
            ],
        })
    ], AnadirLeccionPageModule);
    return AnadirLeccionPageModule;
}());

//# sourceMappingURL=anadir-leccion.module.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnadirLeccionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_anadir_anadir__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_p5_min__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_p5_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_js_p5_min__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var config, db, sw, sh, offset;
/**
 * Generated class for the AnadirLeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnadirLeccionPage = /** @class */ (function () {
    function AnadirLeccionPage(navCtrl, navParams, ap) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ap = ap;
    }
    AnadirLeccionPage.prototype.subir = function () {
        var texto = "";
        for (var i = 0; i < this.ap.notas.length; i++) {
            texto = texto + this.ap.notas[i].d.toString() + "," + this.ap.notas[i].n.toString() + "," + this.ap.notas[i].t.toString() + "/";
        }
        this.ap.anadirLeccion(texto, "Esta leccion fue hecha por ti!");
    };
    AnadirLeccionPage.prototype.borrarNota = function () {
        if (this.ap.notas[0].x < sw * 0.1) {
            offset += this.ap.notas[this.ap.notas.length - 1].d * sw * 0.02;
        }
        this.ap.notas.splice(this.ap.notas.length - 1, 1);
    };
    AnadirLeccionPage.prototype.borrarTodoToditoTodo = function () {
        this.ap.notas.length = 0;
        offset = sw * 0.2;
        console.log("sad");
    };
    AnadirLeccionPage.prototype.ionViewWillLeave = function () {
        console.log("Looks like I'm about to leave :(");
        document.getElementById("defaultCanvas0").parentElement.removeChild(document.getElementById("defaultCanvas0"));
        document.getElementById("defaultCanvas1").parentElement.removeChild(document.getElementById("defaultCanvas1"));
    };
    AnadirLeccionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // The midi notes of a scale
        //               C        D        E        F        G        A        B        C
        var sketch = function (p) {
            var notes = [261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
            var now = 1, index = 0, trigger = 0, autoplay = false;
            sh = window.innerHeight * 0.9;
            sw = window.innerWidth;
            var del, upload; //osc
            var width = sw * 0.06, pianoY = (sh * 0.23), pentaY = (sh / 4) / 5, ini = (sw - width * 8) / 2, separador = sw * 0.01;
            var start, end, nactual;
            _this.ap.notas = [];
            offset = sw * 0.2;
            var enTeclado = false;
            function Nota(d, n, t) {
                var colores;
                var pos;
                this.d = d;
                this.n = n;
                this.t = t;
                this.x = sh * 0.8;
                pos = [sh * 0.5375, sh * 0.5125, sh * 0.4875, sh * 0.4625, sh * 0.4375, sh * 0.4125, sh * 0.3875, sh * 0.3625];
                colores = [p.color(255, 102, 102), p.color(178, 255, 102), p.color(102, 178, 255), p.color(255, 255, 102), p.color(255, 102, 178), p.color(102, 255, 178), p.color(192, 192, 192), p.color(29, 88, 138)];
                this.display = function () {
                    p.fill(colores[n]);
                    p.rect(this.x, pos[n], d * sw * 0.02, sh * 0.025);
                };
                this.pego = function (donde, r) {
                    var dis = dist(this.x, pos[n], donde, pos[n]);
                    if (dis < r) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                this.update = function () {
                    this.x = this.x - t;
                };
            }
            p.setup = function () {
                var canvas = p.createCanvas(sw, sh).parent('defaultCanvas0');
                // A triangle //oscillator
                ////osc = new p5Sound.Sin//osc();
                // Start silent
                //osc.start();
                //osc.amp(0);
            };
            p.draw = function () {
                p.background(256, 256, 256);
                //Pentagrama
                p.stroke(0);
                //Pentagrama
                p.strokeWeight(2);
                for (var j = 0; j < 5; j++) {
                    p.line(sw * 0.05, sh * 0.3 + sh * 0.05 * j, sw * 0.95, sh * 0.3 + sh * 0.05 * j);
                }
                //Linea de "meta"
                p.fill(0);
                p.rect(sw * 0.1, sh * 0.25, sw * 0.02, sh * 0.3);
                //Teclas
                p.fill(255);
                for (var i_1 = 0; i_1 <= 7; i_1++) {
                    p.rect(ini + i_1 * width, pianoY * 3, width, pianoY);
                }
                renderizarnotas(_this.ap.notas);
                for (var i = 0; i < _this.ap.notas.length; i++) {
                    if (_this.ap.notas[i].x < sw * 0.9 && _this.ap.notas[i].x > sw * 0.1) {
                        _this.ap.notas[i].display();
                    }
                }
                // image(img,x,y,width,height)
            };
            // When we click
            p.mousePressed = function () {
                // Map mouse to the key index
                if (p.mouseY > pianoY * 3) {
                    for (var i = 0; i < notes.length; i++) {
                        if (p.mouseX > (i * width) + ini && p.mouseX < (i + 1) * width + ini) {
                            start = Date.now();
                            playNote(notes[i]);
                            nactual = i;
                            enTeclado = true;
                        }
                    }
                }
            };
            // Fade it out when we release
            p.mouseReleased = function () {
                var delta = 0;
                if (enTeclado) {
                    end = Date.now();
                    delta = Math.round(((end - start) * 10) / 1000);
                    if (delta < 1) {
                        delta = 1;
                    }
                    _this.ap.notas.push(new Nota(delta, nactual, 1));
                    console.log(_this.ap.notas[_this.ap.notas.length - 1].n);
                    enTeclado = false;
                }
                //osc.fade(0, 0.4);
            };
            function renderizarnotas(array) {
                try {
                    if (array[array.length - 1].x > sw * 0.9) {
                        offset -= array[array.length - 1].d * sw * 0.02;
                    }
                }
                catch (e) {
                    console.log("aun vacio");
                }
                for (var i = 0; i < array.length; i++) {
                    if (i == 0) {
                        array[i].x = offset;
                    }
                    else {
                        array[i].x = array[i - 1].x + array[i - 1].d * sw * 0.02 + separador;
                    }
                }
            }
            // A function to play a note
            function playNote(note, duration) {
                ////osc.amp(0.5)
                //osc.freq(note);
                // Fade it in
                //osc.fade(1, 0.4);
                // If we sest a duration, fade it out
                if (duration) {
                    console.log("asda");
                    setTimeout(function () {
                        //osc.fade(0, 0.2);
                    }, duration - 50);
                }
            }
            p.windowResized = function () {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
                sw = window.innerWidth;
                sh = window.innerHeight * 0.9;
                width = sw * 0.06;
                pianoY = (sh * 0.23);
                pentaY = (sh / 4) / 5;
                ini = (sw - width * 8) / 2;
                separador = sw * 0.01;
            };
        };
        var myp5 = new __WEBPACK_IMPORTED_MODULE_3__assets_js_p5_min__(sketch);
    };
    AnadirLeccionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-anadir-leccion',template:/*ion-inline-start:"/home/javoz/Clases/HCI/Pianerino/src/pages/anadir-leccion/anadir-leccion.html"*/'<!--\n  Generated template for the AnadirLeccionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>AnadirLeccion</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<script src="assets/js/p5.min.js"></script>\n<script src="assets/js/p5.dom.js"></script>\n<script src="assets/js/print.js"></script>\n<script src="assets/js/p5.sound.min.js"></script>\n\n<ion-content padding>\n    <button ion-button round color="secondary" (click)="subir()">Subir</button>\n    <button ion-button round color="secondary" (click)="borrarNota()">Borrar</button>\n    <button ion-button round color="secondary" (click)="borrarTodoToditoTodo()">Eliminar TODO</button>\n    <div id="defaultCanvas0" style="width: 100%; height: 80%;" width="2100" height="800"></div>\n</ion-content>\n'/*ion-inline-end:"/home/javoz/Clases/HCI/Pianerino/src/pages/anadir-leccion/anadir-leccion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_anadir_anadir__["a" /* AnadirProvider */]])
    ], AnadirLeccionPage);
    return AnadirLeccionPage;
}());

//# sourceMappingURL=anadir-leccion.js.map

/***/ })

});
//# sourceMappingURL=1.js.map