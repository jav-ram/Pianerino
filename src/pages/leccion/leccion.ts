import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnadirProvider } from '../../providers/anadir/anadir';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as p5 from '../../assets/js/p5.min';
import * as p5Sound from '../../assets/js/p5.sound.min';

declare var dcodeIO: any;
var sw, sh, now, largoTotal;
var pos = [sh*0.5375, sh*0.5125, sh*0.4875, sh*0.4625, sh*0.4375, sh*0.4125, sh*0.3875, sh*0.3625];
/**
 * Generated class for the LeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leccion',
  templateUrl: 'leccion.html',
})
export class LeccionPage {

  contenido: string;
  nombreLeccion: string;
  audioCtx=[];
  oscillators=[];
  panNode=[];
  notes=[];
  notas=[];
  gainNode=[];
  puntos: number = 0;
  empezo: boolean = false;
  alert: any;
  panning: number = 0.0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public screenOrientation: ScreenOrientation, private platform: Platform,
    private alertCtrl: AlertController) {
    this.contenido = navParams.get('contenido');
    this.nombreLeccion = navParams.get('nombre');

  }

  ngOnInit(){
    //inciar osciladores
    this.notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
    console.log("ventana",this.navCtrl.getActive().component.name)
    for(let i = 0; i < this.notes.length; i++){
      this.audioCtx[i] = new AudioContext();
      this.oscillators[i] = this.audioCtx[i].createOscillator();
      this.gainNode[i] = this.audioCtx[i].createGain();
      this.panNode[i] = this.audioCtx[i].createStereoPanner();

      this.oscillators[i].type = 'sine';
      this.oscillators[i].frequency.setValueAtTime(this.notes[i], this.audioCtx[i].currentTime); // value in hertz
      this.oscillators[i].connect(this.gainNode[i]);
      this.panNode[i].pan.setValueAtTime(this.panning, this.audioCtx[i].currentTime);
      this.gainNode[i].connect(this.panNode[i])
      this.oscillators[i].start();

      this.gainNode[i].gain.value = 0;


      this.panNode[i].connect(this.audioCtx[i].destination);

    }

    //Alert
    //this.showPopup('Instrucciones', 'Bienvenido a tu primera leccion. Para jugar, toca las teclas justo cuando la nota llegue a la linea negra. Cada nota correcta te da 100 this.puntos, cada incorrecta resta 50 a tu puntaje. Arriba a la derecha encontraras un boton de , este te permite empezar la leccion desde 0. Suerte!');
    if (this.alert == undefined && this.navCtrl.getActive().component.name == 'LeccionPage'){
      this.alert = this.alertCtrl.create({
        title: 'Instrucciones',
        subTitle: 'Bienvenido a tu primera leccion. Para jugar, toca las teclas justo cuando la nota llegue a la linea negra. Cada nota correcta te da 100 this.puntos, cada incorrecta resta 50 a tu puntaje. Arriba a la derecha encontraras un boton de , este te permite empezar la leccion desde 0. Suerte!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.empezo = true;
              this.alert = undefined;
            }
          }
        ]
      });
      this.alert.present();
    }
  }



  ionViewDidLeave() {
    console.log("Looks like I'm about to leave :(");
    if (this.platform.is('android') || this.platform.is('ios')){
      //device-specific code, such as detecting screen rotation
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    else {
        //desktop browser only code
    }
    //document.getElementById("defaultCanvas0").parentElement.removeChild(document.getElementById("defaultCanvas0"));
    document.getElementById("defaultCanvas1").parentElement.removeChild(document.getElementById("defaultCanvas1"));
  }

  private changePanning(){
    for(let i = 0; i < this.notes.length; i++){
      this.panNode[i].pan.setValueAtTime(this.panning/10, this.audioCtx[i].currentTime);
    }
  }

  pausa(){
    for(let i = 0; i < this.notas.length; i++){
      this.notas[i].t = 0;
    }
  }

  play(){
    for(let i = 0; i < this.notas.length; i++){
      this.notas[i].t = 1;
    }
  }

  private playNote(tecla){
    console.log("faaaaa")
    if (!this.empezo) {
      this.empezo = true;
      this.puntos+=50;
    }
    // create Oscillator node
    this.gainNode[tecla].gain.value = 1
    try{
      if (tecla == this.notas[now].n && this.notas[now].pego(sw*0.1 , sw*0.0375)) {
        console.log("niceee");
        this.puntos += 100;
      }else {
        console.log("pato Af");
        this.puntos -= 50;
      }
    }catch(e){
      console.log("se acabo la cancion we");
    }
  }

  restarterino(){
    let pos = [sh*0.5375, sh*0.5125, sh*0.4875, sh*0.4625, sh*0.4375, sh*0.4125, sh*0.3875, sh*0.3625];
    now = 0;
    largoTotal = 0;
    //this.notas.length = 0;
    let separador = sw*0.01;
    this.puntos = 0;
    console.log(this.notas);
    for (let i = 0; i < this.notas.length; i++) {
      if (i==0) {
        this.notas[i].x = sw*0.3;
      }else {
        this.notas[i].x = this.notas[i-1].x + this.notas[i-1].d * sw * 0.02 + separador;
      }
      this.notas[i].y = pos[this.notas[i].n];
    }
    console.log(this.notas);
  }

  private unplayNote(tecla){
    // Important! Setting a scheduled parameter value
    this.gainNode[tecla].gain.setValueAtTime(this.gainNode[tecla].gain.value, this.audioCtx[tecla].currentTime);

    this.gainNode[tecla].gain.exponentialRampToValueAtTime(0.0001, this.audioCtx[tecla].currentTime + 0.03);;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeccionPage');
    console.log(this.screenOrientation.type);
    console.log(this.screenOrientation.ORIENTATIONS);
    console.log(this.screenOrientation);


    let sketch = p => {

      now = 0;
      largoTotal=0;
      let index = 0, trigger = 0, autoplay = false;
      this.puntos = 0;
      sw = window.innerWidth;
      sh = window.innerHeight;
      let osc;
      let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
      let start, end, nactual, separador = sw*0.01;
      // this.notas = [];
      //DEFINICION DE UNA NOTA
      function Nota(d, n, t){
        let colores;
        let pos;
        this.d = d;
        this.n = n;
        this.t = t;
        this.x = sh*0.8;
        pos = [sh*0.5375, sh*0.5125, sh*0.4875, sh*0.4625, sh*0.4375, sh*0.4125, sh*0.3875, sh*0.3625];
        colores = [p.color(255, 102, 102), p.color(178, 255, 102), p.color(102, 178, 255), p.color(255, 255, 102), p.color(255, 102, 178), p.color(102, 255, 178), p.color(192, 192, 192), p.color(29,88 ,138)];
        this.y = pos[n]
        this.display = function(){
          p.fill(colores[n]);
          p.rect(this.x, this.y, d*sw*0.02, sh*0.025);
        }

        this.pego = function(donde, r) {
          var dis = p.dist(this.x, this.y, donde, this.y);
          if (dis< r) {
            return true;
          }else {
            return false;
          }
        }

        this.update = function(){
          this.x = this.x - this.t;

        }
      }

      //LOGICA DE LA LECCION
      p.setup = () =>
      {
        console.log("dimensiones: " + sw + "x" + sh);
        var canvas = p.createCanvas(sw , sh).parent('defaultCanvas1');
        p.agregar(this.contenido)
        this.restarterino();
      }

      p.draw = () =>
      {
        p.background(256,256,256);
        //Pentagrama
        p.stroke(p.color(0, 0, 0));
        //Pentagrama
        p.strokeWeight(2);
        for (let j = 0; j < 5; j++){
          p.line(sw*0.05, sh*0.3 + sh*0.05*j, sw*0.95, sh*0.3 + sh*0.05*j);
        }


        p.fill(0);
        p.rect(sw*0.1 , sh*0.25 , sw*0.02, sh*0.3);

        if (this.empezo) {
          for (var i = 0; i < this.notas.length; i++) {
            if (this.notas[i].x < sw*0.9 && this.notas[i].x > sw*0.1 ) {
              this.notas[i].display();
            }
            this.notas[i].update();
          }
        }

        try{
          if (this.notas[now].pego(sw*0.1, 1)) {
            now +=1;
          }
        }catch(error){
          //console.error(error);
        }
        p.fill(0);
        p.textSize(sw*0.05);
        //p.text(str,x,y,x2,y2)
        p.text("Puntos: " + this.puntos , sw * 0.38 , sh * 0.22);

        try {
          if (this.notas[this.notas.length - 1].x < sw*0.1) {
            if (this.nombreLeccion == "Primera vez") {
              //p.text(" Felicidades, has completado tu primera\n leccion. ¡Sigue aprendiendo!\n\n\n\n OBTUVISTE " + this.puntos +" PUNTOS", sw*0.2,sh*0.3);
              if (this.alert == undefined){
                this.alert = this.alertCtrl.create({
                  title: 'Felicidades',
                  subTitle: 'Has completado tu primera leccion. ¡Sigue aprendiendo! OBTUVISTE ' + this.puntos + ' PUNTOS',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        if (this.navCtrl.getActive().component.name == 'LeccionPage') {
                            this.navCtrl.pop();
                        }
                        else {
                          console.log("hubo un error")
                        }
                        //this.alert.dismiss();
                        this.alert = undefined;
                      }
                    }
                  ]
                });
                if (this.navCtrl.getActive().component.name == 'LeccionPage'){
                  this.alert.present();
                }

              }
            }else {
              //p.text(" TERMINO LA LECCION! \n OBTUVISTE " + this.puntos +" PUNTOS", sw*0.2,sh*0.3);
              if(this.alert == undefined && this.navCtrl.getActive().component.name == 'LeccionPage'){
                this.alert = this.alertCtrl.create({
                  title: 'TERMINO LA LECCION!',
                  subTitle: 'OBTUVISTE ' + this.puntos + ' PUNTOS',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                        this.alert = undefined;
                      }
                    }
                  ]
                });
                this.alert.present();
              }
            }
            //p.noLoop();
          }
        } catch (e) {

        }


      }

      function renderizarnotas(array){
        let pos = [sh*0.5375, sh*0.5125, sh*0.4875, sh*0.4625, sh*0.4375, sh*0.4125, sh*0.3875, sh*0.3625];
        for (let i = 0; i < array.length; i++) {
          if (i==0) {
            array[i].x = sw*0.3;
          }else {
            array[i].x = array[i-1].x + array[i-1].d * sw * 0.02 + separador;
          }
          array[i].y = pos[array[i].n];
        }
      }

      // When we click
      p.mousePressed = () => {

        // Map mouse to the key index
        if (p.mouseY > pianoY * 3){
          if (!this.empezo) {
            this.empezo = true;
            this.puntos+=50;
          }
        }
      }

      // Fade it out when we release
      p.mouseReleased = () => {
        //osc.fade(0, 0.4);
      }

      p.agregar = (txt) =>{
        console.log(txt);
        var lineas = txt.split("/");
        for (var i = 0; i < lineas.length - 1; i++) {
          var linea = lineas[i].split(",");
          this.notas[i]=(new Nota(parseInt(linea[0]),parseInt(linea[1]),parseInt(linea[2])));
          largoTotal = largoTotal + parseInt(linea[0])*sw*0.03 + separador;
        }

        largoTotal -= separador;
        console.log("largo Total " + largoTotal);
        renderizarnotas(this.notas);
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        console.log(sw, sh)
        sw = p.windowWidth;
        sh = p.windowHeight;
        console.log(sw, sh)
        width = sw*0.06;
        pianoY = (sh*0.23);
        pentaY = (sh/4)/5;
        ini = (sw - width * 8)/2;
        separador = sw*0.01;
        this.restarterino();
         console.log("Resize");
      }
    }
    let myp5 = new p5(sketch);


  }

}
