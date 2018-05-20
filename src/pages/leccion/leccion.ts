import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnadirProvider } from '../../providers/anadir/anadir';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as p5 from '../../assets/js/p5.min';
import * as p5Sound from '../../assets/js/p5.sound.min';

declare var dcodeIO: any;
var sw, sh, notas;
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
  notes=[];
  gainNode=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public screenOrientation: ScreenOrientation, private platform: Platform) {
    this.contenido = navParams.get('contenido');
    this.nombreLeccion = navParams.get('nombre');

  }

  ngOnInit(){
    //inciar osciladores
    this.notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
    for(let i = 0; i < this.notes.length; i++){
      this.audioCtx[i] = new AudioContext();
      this.oscillators[i] = this.audioCtx[i].createOscillator();
      this.gainNode[i] = this.audioCtx[i].createGain();

      this.oscillators[i].type = 'sine';
      this.oscillators[i].frequency.setValueAtTime(this.notes[i], this.audioCtx[i].currentTime); // value in hertz
      this.oscillators[i].connect(this.gainNode[i]);
      this.gainNode[i].connect(this.audioCtx[i].destination)
      this.oscillators[i].start();

      this.gainNode[i].gain.value = 0;
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

  private playNote(tecla){
    // create Oscillator node
    this.gainNode[tecla].gain.value = 1
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
    //set landscape view
    if (this.platform.is('android') || this.platform.is('ios')){
      //device-specific code, such as detecting screen rotation
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    else {
        //desktop browser only code
    }


    let sketch = p => {

      let now = 0, puntos = 0, index = 0, trigger = 0, autoplay = false, empezo = false;
      sw = window.innerWidth;
      sh = window.innerHeight;
      let osc;
      let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
      let start, end, nactual, restart, separador = sw*0.01, largoTotal=0, //rSlider, //pan;
      notas = [];
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

        this.display = function(){
          p.fill(colores[n]);
          p.rect(this.x, pos[n], d*sw*0.02, sh*0.025);
        }

        this.pego = function(donde, r) {
          var dis = p.dist(this.x, pos[n], donde, pos[n]);
          if (dis< r) {
            return true;
          }else {
            return false;
          }
        }

        this.update = function(){
          this.x = this.x - t;

        }
      }

      //LOGICA DE LA LECCION
      p.setup = () =>
      {
        console.log("dimensiones: " + sw + "x" + sh);
        var canvas = p.createCanvas(sw , sh).parent('defaultCanvas1');
        restart = p.loadImage("assets/imgs/refresh2.png");
        agregar(this.contenido)
        // A triangle oscillator
        //osc = new this.P5.SinOsc();
        //pan = p.createSlider(0, 2, 1);
        //pan.position(sw*0.45, sh * 0.1);
        //pan.style('width', '10%');
        //leer("assets/js/lecciones/prueba.txt", function(){console.log("Yei");});
        // Start silent
        // osc.start();
        // osc.amp(0);
      }

      p.draw = () =>
      {
        // p.fill(0);
        // p.textSize(16);
        // p.text("L        R",sw*0.45,sh*0.5);

        //var r = //rSlider.value();
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
        /*
        //Teclas
        p.fill(255);
        for (let i = 0; i <= 7; i++){
          p.rect(ini + i * width, pianoY*3, width, pianoY);
        }*/
        if (empezo) {
          for (var i = 0; i < notas.length; i++) {
            if (notas[i].x < sw*0.9 && notas[i].x > sw*0.1 ) {
              notas[i].display();
            }
            notas[i].update();
          }
        }

        try{
          if (notas[now].pego(sw*0.1, 1)) {
            now +=1;
          }
        }catch(error){
          //console.error(error);
        }
        p.fill(0);
        p.textSize(32);
        //p.text(str,x,y,x2,y2)
        p.text("Puntos: " + puntos , sw * 0.45 , sh * 0.2);
        p.image(restart ,sw*0.9 ,sh*0.03, sw*0.05, sw*0.05);

        // try {
        //   //let s = rSlider.value();
        //   //rSlider.value(largoTotal - notas[notas.length-1].x + notas[notas.length-1].d*sw*0.02)
        // } catch (e) {
        //  console.log(e)
        // }

        try {
          if (notas[notas.length - 1].x < sw*0.1) {
            p.fill(p.color(204, 217, 255));
            p.rect(sw*0.2,sh*0.2,sw*0.6,sh*0.6);
            p.textSize(sw*0.028);
            p.fill(p.color(13, 13, 38));
            p.strokeWeight(1);
            if (this.nombreLeccion == "Primera vez") {
              p.text(" Felicidades, has completado tu primera\n leccion. ¡Sigue aprendiendo!\n\n\n\n OBTUVISTE " + puntos +" PUNTOS", sw*0.2,sh*0.3);
            }else {
              p.text(" TERMINO LA LECCION! \n OBTUVISTE " + puntos +" PUNTOS", sw*0.2,sh*0.3);
            }
            p.noLoop();
          }
        } catch (e) {

        }

        if (!empezo){
          if (this.nombreLeccion == "Primera vez") {
            p.fill(p.color(204, 217, 255));
            p.rect(sw*0.2,sh*0.2,sw*0.6,sh*0.6);
            p.textSize(sw*0.02);
            p.fill(p.color(13, 13, 38));
            p.strokeWeight(1);
            p.text(" Bienvenido a tu primera leccion. Para jugar, toca las teclas\n justo cuando la nota llegue a la linea negra.\n Cada nota correcta te da 100 puntos, cada incorrecta resta\n 50 a tu puntaje.\n Arriba a la derecha encontraras un boton de 'reset', este te\n permite empezar la leccion desde 0. Suerte!\n\n\n             [Presiona cualquier tecla para continuar]",sw*0.2,sh*0.3);
          }else {
            p.fill(p.color(204, 217, 255));
            p.rect(sw*0.3,sh*0.4,sw*0.4,sh*0.2);
            p.textSize(sw*0.02);
            p.fill(p.color(13, 13, 38));
            p.strokeWeight(1);
            p.text("    [Presiona una tecla para continuar]",sw*0.3,sh*0.5)
          }
        }
      }

      function renderizarNotas(array){
        for (let i = 0; i < array.length; i++) {
          if (i==0) {
            array[i].x = sw*0.3;
          }else {
            array[i].x = array[i-1].x + array[i-1].d * sw * 0.02 + separador;
          }
        }
      }

      // A function to play a note
      function playNote(note, duration) {
        //osc.amp(0.5)
        // osc.freq(note);
        // osc.//pan(//pan.value()-1, 0);
        // // Fade it in
        // osc.fade(1, 0.4);

        // If we sest a duration, fade it out
        if (duration) {
          console.log("asda");
          setTimeout(function() {
            //osc.fade(0, 0.2);
          }, duration-50);
        }
      }

      // When we click
      p.mousePressed = () => {

        // Map mouse to the key index
        if (p.mouseY > pianoY * 3){
          if (!empezo) {
            empezo = true;
            puntos+=50;
          }
          for (let i = 0; i < this.notes.length; i++){
            if (p.mouseX > (i * width)+ini && p.mouseX < (i+1) * width + ini){
              //playNote(this.notes[i]);
              if (i == notas[now].n && notas[now].pego(sw*0.1 ,60)) {
                console.log("niceee");
                puntos += 100;
              }else {
                console.log("pato Af");
                puntos -= 50;
              }
            }
          }
        }else if (p.mouseX > sw*0.90 && p.mouseY < sh*0.1) {
          restarterino();
        }else if (p.mouseX < 0.05*sw && p.mouseY < sh*0.1) {
          window.open("localhost:8100");
        }
        // try {
        //   //console.log(//rSlider.value());
        // } catch (e) {
        //   console.log("no value yet Xd");
        // }

      }

      // Fade it out when we release
      p.mouseReleased = () => {
        //osc.fade(0, 0.4);
      }

      function agregar(txt){
        console.log(txt);
        var lineas = txt.split("/");
        for (var i = 0; i < lineas.length - 1; i++) {
          var linea = lineas[i].split(",");
          notas.push(new Nota(parseInt(linea[0]),parseInt(linea[1]),parseInt(linea[2])));
          largoTotal = largoTotal + parseInt(linea[0])*sw*0.03 + separador;
        }

        largoTotal -= separador;
        console.log("largo Total " + largoTotal);
        // try {
        //   //rSlider.remove();
        // } catch (e) {
        //   console.log("Aun no hay un slider");
        // } finally {
        //   //rSlider = createSlider(0, largoTotal, 0);
        //   //rSlider.position(sw*0.2, sh * 0.6);
        //   //rSlider.style('width', '60%');
        // }
        renderizarNotas(notas);
        console.log(notas);
      }

      function restarterino(){
        now = 0;
        largoTotal = 0;
        notas.length = 0;
        puntos = 0;
        p.loop();
        //leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
        agregar(this.contenido);
      }


      p.windowResized = () => {
         p.resizeCanvas(p.windowWidth, p.windowHeight);
         sw = p.windowWidth;
         sh = p.windowHeight;
         width = sw*0.06;
         pianoY = (sh*0.23);
         pentaY = (sh/4)/5;
         ini = (sw - width * 8)/2;
         separador = sw*0.01;
         console.log("Resize");
      }
    }
    let myp5 = new p5(sketch);


  }

}
