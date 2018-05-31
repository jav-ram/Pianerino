import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnadirProvider } from '../../providers/anadir/anadir'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as p5 from '../../assets/js/p5.min'
import * as p5Sound from '../../assets/js/p5.sound.min'

declare var dcodeIO: any;
var config, db, sw, sh, offset;
/**
 * Generated class for the AnadirLeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-anadir-leccion',
  templateUrl: 'anadir-leccion.html',
})

export class AnadirLeccionPage {

  audioCtx=[];
  oscillators=[];
  panNode=[];
  notes=[];
  notas=[];
  gainNode=[];
  start: any;
  end: any;
  leccion: string;
  panning: number = 0.0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ap:AnadirProvider , public screenOrientation: ScreenOrientation, private platform: Platform) {
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

  }

  private changePanning(){
    for(let i = 0; i < this.notes.length; i++){
      this.panNode[i].pan.setValueAtTime(this.panning/10, this.audioCtx[i].currentTime);
    }
  }

  subir() {
    var texto = "";
    for (var i = 0; i < this.ap.notas.length; i++) {
      texto = texto + this.ap.notas[i].d.toString()+ "," + this.ap.notas[i].n.toString() + "," + this.ap.notas[i].t.toString() + "/";
    }
    this.ap.anadirLeccion(texto, "Esta leccion fue hecha por ti!")
  }

  borrarNota(){
    if (this.ap.notas[0].x < sw*0.1) {
      offset += this.ap.notas[this.ap.notas.length-1].d*sw*0.02;
    }
    this.ap.notas.splice(this.ap.notas.length - 1 ,1)
  }

  borrarTodoToditoTodo(){
    this.ap.notas.length = 0;
    offset = sw*0.2;
    console.log("sad")
  }

  private playNote(tecla){
    // create Oscillator node
    this.gainNode[tecla].gain.value = 1;
    this.start = Date.now();
  }

  private unplayNote(tecla){
    // Important! Setting a scheduled parameter value
    this.gainNode[tecla].gain.setValueAtTime(this.gainNode[tecla].gain.value, this.audioCtx[tecla].currentTime);
    console.log("help")
    this.gainNode[tecla].gain.exponentialRampToValueAtTime(0.0001, this.audioCtx[tecla].currentTime + 0.03);;
    this.end = Date.now();
    var delta = Math.round(((this.end - this.start)*10)/1000);
    if (delta<1) {
      delta = 1;
    }
    this.leccion += delta.toString() + "," + tecla.toString() + ", 1/" ;
    console.log(this.leccion)
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    document.getElementById("defaultCanvas0").parentElement.removeChild(document.getElementById("defaultCanvas0"));
    //document.getElementById("defaultCanvas1").parentElement.removeChild(document.getElementById("defaultCanvas1"));
    if (this.platform.is('android') || this.platform.is('ios')){
      //device-specific code, such as detecting screen rotation
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    else {
        //desktop browser only code
    }
  }

  ionViewDidLoad() {
    if (this.platform.is('android') || this.platform.is('ios')){
      //device-specific code, such as detecting screen rotation
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    else {
        //desktop browser only code
    }
    // The midi notes of a scale
    //               C        D        E        F        G        A        B        C
    let sketch = p => {
    let now = 1, index = 0, trigger = 0, autoplay = false;
    sh = window.innerHeight*0.9;
    sw = window.innerWidth;
    let del, upload ;//osc
    let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2, separador = sw*0.01;
    let start, end, nactual;
    this.ap.notas = [];
    offset = sw*0.2;
    let enTeclado = false;
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

    p.setup = () =>
    {
      var canvas = p.createCanvas(sw ,sh).parent('defaultCanvas0');
      // A triangle //oscillator
      ////osc = new p5Sound.Sin//osc();

      // Start silent
      //osc.start();
      //osc.amp(0);
    }

    p.draw = () =>
    {
      p.background(256,256,256);
      //Pentagrama
      p.stroke(0);
      //Pentagrama
      p.strokeWeight(2);
      for (let j = 0; j < 5; j++){
        p.line(sw*0.05, sh*0.3 + sh*0.05*j, sw*0.95, sh*0.3 + sh*0.05*j);
      }
      //Linea de "meta"
      p.fill(0);
      p.rect(sw*0.1 , sh*0.25 , sw*0.02, sh*0.3);
      //Teclas
      p.fill(255);
      for (let i = 0; i <= 7; i++){
        p.rect(ini + i * width, pianoY*3, width, pianoY);
      }

      renderizarnotas(this.ap.notas);
      for (var i = 0; i < this.ap.notas.length; i++) {
        if (this.ap.notas[i].x < sw*0.9 && this.ap.notas[i].x > sw*0.1 ) {
          this.ap.notas[i].display();
        }
      }

      // image(img,x,y,width,height)
    }

    // When we click
    p.mousePressed = () => {
      // Map mouse to the key index
      if (p.mouseY > pianoY * 3){
        for (let i = 0; i < this.notes.length; i++){
          if (p.mouseX > (i * width)+ini && p.mouseX < (i+1) * width + ini){
            start = Date.now();
            //playNote(notes[i]);
            nactual = i;
            enTeclado = true;
          }
        }
      }
    }

    // Fade it out when we release
    p.mouseReleased = () => {
    var delta = 0;
      if (enTeclado) {
        end = Date.now();
        delta = Math.round(((end - start)*10)/1000);
        if (delta<1) {
          delta = 1;
        }
        this.ap.notas.push(new Nota(delta, nactual, 1));
        console.log(this.ap.notas[this.ap.notas.length - 1].n);
        enTeclado = false;
      }

      //osc.fade(0, 0.4);
    }


    function renderizarnotas(array){
      try {
        if (array[array.length - 1].x > sw*0.9) {
          offset -= array[array.length - 1].d * sw * 0.02;
        }
      } catch (e) {
        console.log("aun vacio");
      }
      for (let i = 0; i < array.length; i++) {
        if (i==0) {
          array[i].x = offset;
        }else {
          array[i].x = array[i-1].x + array[i-1].d * sw * 0.02 + separador;
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
        setTimeout(function() {
          //osc.fade(0, 0.2);
        }, duration-50);
      }
    }

    p.windowResized = () => {
       p.resizeCanvas(window.innerWidth, window.innerHeight);
       sw =window.innerWidth;
       sh = window.innerHeight*0.9;
       width = sw*0.06;
       pianoY = (sh*0.23);
       pentaY = (sh/4)/5;
       ini = (sw - width * 8)/2;
       separador = sw*0.01;
    }}
    let myp5 = new p5(sketch);
  }


}
