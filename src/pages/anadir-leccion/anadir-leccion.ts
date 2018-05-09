import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as p5 from '../../assets/js/p5.min'
import * as p5Sound from '../../assets/js/p5.sound.min'

declare var dcodeIO: any;
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
  // public maestro: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnadirLeccionPage');
    var config = {
      apiKey: "AIzaSyBEC03gubW1gl-v2i26xJr1vxsmCnQl_RI",
      authDomain: "pianerino.firebaseapp.com",
      databaseURL: "https://pianerino.firebaseio.com",
      projectId: "pianerino",
      storageBucket: "pianerino.appspot.com",
      messagingSenderId: "7147492081"
    };
    firebase.initializeApp(config);


    // The midi notes of a scale
    //               C        D        E        F        G        A        B        C
    let sketch = p => {
    let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
    let now = 1, index = 0, trigger = 0, autoplay = false;
    let sw = window.innerWidth;
    let sh = window.innerHeight;
    let del, upload ;//osc
    let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
    let start, end, nactual;
    var db = firebase.firestore();
    let notas = [];
    let offset = sw*0.2, separador = sw*0.01;
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
        var dis = dist(this.x, pos[n], donde, pos[n]);
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
    console.log("REEEEEEE");
    p.setup = () =>
    {
      del = p.loadImage("assets/imgs/delete2.png");
      upload = p.loadImage("assets/imgs/upload2.png");
      var canvas = p.createCanvas(sw ,sh);

      // A triangle //oscillator
      ////osc = new p5Sound.Sin//osc();

      //leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
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

      renderizarNotas(notas);
      for (var i = 0; i < notas.length; i++) {
        if (notas[i].x < sw*0.9 && notas[i].x > sw*0.1 ) {
          notas[i].display();
        }
      }

      p.textSize(32);
      p.text("Borrar",sw*0.9, sh*0.1)
      p.image(del,0, sh*0.03, sw*0.05, sw*0.05);
      p.image(upload, sw*0.05, sh*0.03, sw*0.05, sw*0.05);
      // image(img,x,y,width,height)
    }

    // When we click
    p.mousePressed = () => {
      // Map mouse to the key index
      if (p.mouseY > pianoY * 3){
        for (let i = 0; i < notes.length; i++){
          if (p.mouseX > (i * width)+ini && p.mouseX < (i+1) * width + ini){
            start = Date.now();
            playNote(notes[i]);
            nactual = i;
            enTeclado = true;
          }
        }
      }
      //Si presiona el boton de borrar
      if (p.mouseX > sw*0.9 && p.mouseY < sh*0.1) {
        borrarNota();
        console.log("borrado prro");
      }else if (p.mouseX < sw*0.05 && p.mouseY < sh*0.1) {
        borrarTodoToditoTodo();
      }else if (p.mouseX > sw*0.05 && p.mouseX < sw*0.1 && p.mouseY < sh*0.1) {
        console.log("Aqui se subiria la wea, si supiera como ...");
        // Add a new document in collection "cities"
        db.collection("Lecciones").doc("Nueva").set({
        color: "#00b0ff",
        descripcion: "NUEVA LECCION!",
        dificultad: "1",
        imagen: "https://firebasestorage.googleapis.com/v0/b/pianerino.appspot.com/o/Iconos%2FLecciones%2F3_teclas.png?alt=media&token=74dfa35e-98d0-4c0f-b4b5-e3b115d6d97b",
        leccion: {contenido:parsearLeccion()},
        nombre:"nueva leccion"
        })
        .then(function() {
        console.log("Document successfully written!");
        })
        .catch(function(error) {
        console.error("Error writing document: ", error);
        });
        parsearLeccion();
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
        notas.push(new Nota(delta, nactual, 1));
        console.log(notas[notas.length - 1].n);
        enTeclado = false;
      }

      //osc.fade(0, 0.4);
    }


    function renderizarNotas(array){
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

    function borrarNota(){
      if (notas[0].x < sw*0.1) {
        offset += notas[notas.length-1].d*sw*0.02;
      }
      notas.splice(notas.length - 1 ,1)
    }

    function parsearLeccion(){
      var texto = "";
      for (var i = 0; i < notas.length; i++) {
        texto = texto + notas[i].d.toString()+ "," + notas[i].n.toString() + "," + notas[i].t.toString() + "/";
      }
      return texto;
    }

    function borrarTodoToditoTodo(){
      notas.length = 0;
      offset = sw*0.2;
    }

    function windowResized() {
       p.resizeCanvas(windowWidth, windowHeight);
       sw =windowWidth;
       sh = windowHeight;
       width = sw*0.06;
       pianoY = (sh*0.23);
       pentaY = (sh/4)/5;
       ini = (sw - width * 8)/2;
       separador = sw*0.01;
    }}
    let myp5 = new p5(sketch);
  }

}
