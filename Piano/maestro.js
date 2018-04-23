// The midi notes of a scale
//               C        D        E        F        G        A        B        C
let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
let now = 1, puntos = 0, index = 0, trigger = 0, autoplay = false;
let sw = window.innerWidth;
let osc;
let width = 100, pianoY = ((screen.height - 300) / 4), pentaY = (screen.height/4)/5, ini = (sw - width * 8)/2;
let start, end, nactual;
let notas = [];
let enTeclado = false;

function setup()
{
  createCanvas(sw ,screen.height - 300);
  // A triangle oscillator
  osc = new p5.SinOsc();

  //leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
  // Start silent
  osc.start();
  osc.amp(0);
}

function draw()
{
  background(256,256,256);
  //Pentagrama
  stroke(color(0, 0, 0));
  //Pentagrama
  strokeWeight(2);
  for (let j = 0; j < 5; j++){
    line(sw*0.05, 200 + 50*j, sw*0.95, 200 + 50*j);
  }
  fill(0);
  rect(150, 150, 40, 300);
  //Teclas
  fill(255);
  for (let i = 0; i <= 7; i++){
    rect(ini + i * width, pianoY*3, width, pianoY);
  }

  renderizarNotas(notas);
  for (var i = 0; i < notas.length; i++) {
    notas[i].display();
  }
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  if (mouseY > pianoY * 3){
    for (let i = 0; i < notes.length; i++){
      if (mouseX > (i * width)+ini && mouseX < (i+1) * width + ini){
        start = Date.now();
        playNote(notes[i]);
        nactual = i;
        enTeclado = true;
      }
    }
  }
  if (mouseX > sw*0.8 && mouseY < 200) {
    borrarNota();
    console.log("borrado prro");
  }
}

// Fade it out when we release
function mouseReleased() {
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

  osc.fade(0, 0.4);
}


function renderizarNotas(array){
  for (let i = 0; i < array.length; i++) {
    if (i==0) {
      array[i].x = sw-sw*0.8;
    }else {
      array[i].x = array[i-1].x + array[i-1].d * 20;
    }
  }
}

// A function to play a note
function playNote(note, duration) {
  //osc.amp(0.5)
  osc.freq(note);
  // Fade it in
  osc.fade(1, 0.4);

  // If we sest a duration, fade it out
  if (duration) {
    console.log("asda");
    setTimeout(function() {
      osc.fade(0, 0.2);
    }, duration-50);
  }
}

function borrarNota(){
  notas.splice(notas.length - 1 ,1)
}

function parsearLeccion(){
  var texto = "";
  for (var i = 0; i < notas.length; i++) {
    texto = texto + notas[i].d.toString()+ "," + notas[i].n.toString() + "," + notas[i].t.toString() + "/";
  }
  return texto;
}
