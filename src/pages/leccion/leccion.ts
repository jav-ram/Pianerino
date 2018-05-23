import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnadirProvider } from '../../providers/anadir/anadir';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as p5 from '../../assets/js/p5.min';
import * as p5Sound from '../../assets/js/p5.sound.min';

declare var dcodeIO: any;
var sw, sh, now, largoTotal;
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
  notas=[];
  gainNode=[];
  puntos: number = 0;

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
    console.log("faaaaa")
    // create Oscillator node
    this.gainNode[tecla].gain.value = 1
    if (tecla == this.notas[now].n && this.notas[now].pego(sw*0.1 ,60)) {
      console.log("niceee");
      this.puntos += 100;
    }else {
      console.log("pato Af");
      this.puntos -= 50;
    }
  }

  restarterino(){
    now = 0;
    largoTotal = 0;
    this.notas.length = 0;
    this.puntos = 0;
    //leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
    //agregar(this.contenido);
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

      now = 0;
      largoTotal=0;
      let index = 0, trigger = 0, autoplay = false, empezo = false;
      this.puntos = 0;
      sw = window.innerWidth;
      sh = window.innerHeight;
      let osc;
      let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
      let start, end, nactual, restart, separador = sw*0.01;
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
          this.x = this.x - t;

        }
      }

      //LOGICA DE LA LECCION
      p.setup = () =>
      {
        console.log("dimensiones: " + sw + "x" + sh);
        var canvas = p.createCanvas(sw , sh).parent('defaultCanvas1');
        restart = p.loadImage("assets/imgs/refresh2.png");
        p.agregar(this.contenido)
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
        p.textSize(32);
        //p.text(str,x,y,x2,y2)
        p.text("Puntos: " + this.puntos , sw * 0.45 , sh * 0.2);
        p.image(restart ,sw*0.9 ,sh*0.03, sw*0.05, sw*0.05);

        // try {
        //   //let s = rSlider.value();
        //   //rSlider.value(largoTotal - this.notas[this.notas.length-1].x + this.notas[this.notas.length-1].d*sw*0.02)
        // } catch (e) {
        //  console.log(e)
        // }

        try {
          if (this.notas[this.notas.length - 1].x < sw*0.1) {
            p.fill(p.color(204, 217, 255));
            p.rect(sw*0.2,sh*0.2,sw*0.6,sh*0.6);
            p.textSize(sw*0.028);
            p.fill(p.color(13, 13, 38));
            p.strokeWeight(1);
            if (this.nombreLeccion == "Primera vez") {
              p.text(" Felicidades, has completado tu primera\n leccion. ¡Sigue aprendiendo!\n\n\n\n OBTUVISTE " + this.puntos +" PUNTOS", sw*0.2,sh*0.3);
            }else {
              p.text(" TERMINO LA LECCION! \n OBTUVISTE " + this.puntos +" PUNTOS", sw*0.2,sh*0.3);
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
            p.text(" Bienvenido a tu primera leccion. Para jugar, toca las teclas\n justo cuando la nota llegue a la linea negra.\n Cada nota correcta te da 100 this.puntos, cada incorrecta resta\n 50 a tu puntaje.\n Arriba a la derecha encontraras un boton de 'reset', este te\n permite empezar la leccion desde 0. Suerte!\n\n\n             [Presiona cualquier tecla para continuar]",sw*0.2,sh*0.3);
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

      function renderizarnotas(array){
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
            this.puntos+=50;
          }
          for (let i = 0; i < this.notes.length; i++){
            if (p.mouseX > (i * width)+ini && p.mouseX < (i+1) * width + ini){
              //console.log(this.notas)
              //playNote(this.notes[i]);
              // if (i == this.notas[now].n && this.notas[now].pego(sw*0.1 ,60)) {
              //   console.log("niceee");
              //   this.puntos += 100;
              // }else {
              //   console.log("pato Af");
              //   this.puntos -= 50;
              // }
            }
          }
        }else if (p.mouseX > sw*0.90 && p.mouseY < sh*0.1) {
          //restarterino();
        }else if (p.mouseX < 0.05*sw && p.mouseY < sh*0.1) {
          //window.open("localhost:8100");
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
        // try {
        //   //rSlider.remove();
        // } catch (e) {
        //   console.log("Aun no hay un slider");
        // } finally {
        //   //rSlider = createSlider(0, largoTotal, 0);
        //   //rSlider.position(sw*0.2, sh * 0.6);
        //   //rSlider.style('width', '60%');
        // }
        renderizarnotas(this.notas);
      }

      p.windowResized = () => {
        let pos = [sh*0.5375, sh*0.5125, sh*0.4875, sh*0.4625, sh*0.4375, sh*0.4125, sh*0.3875, sh*0.3625];
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        sw = p.windowWidth;
        sh = p.windowHeight;
        width = sw*0.06;
        pianoY = (sh*0.23);
        pentaY = (sh/4)/5;
        ini = (sw - width * 8)/2;
        separador = sw*0.01;
        for (let i = 0; i < this.notas.length; i++){
           this.notas[i].y = pos[this.notas[i].n];
        }
         console.log("Resize");
      }
    }
    let myp5 = new p5(sketch);


  }

}
