// The midi notes of a scale
//               C        D        E        F        G        A        B        C
let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
let now = 1;
let puntos = 0;
// For automatically playing the song
let index = 0;
let sw = screen.width;
let trigger = 0;
let autoplay = false;
let osc;
let width = 100;
let pianoY = ((screen.height - 300) / 4);
let pentaY = (screen.height/4)/5
let ini = (sw - 500 - width * 7)/2
let notas = [];

function setup()
{
  createCanvas(sw - 0.2*sw ,screen.height - 300);
  // A triangle oscillator
  osc = new p5.SinOsc();
  // notas.push(new Nota(2, 0, 1));
  // notas.push(new Nota(5, 2, 1));
  // notas.push(new Nota(2, 0, 1));
  // notas.push(new Nota(3, 0, 1));

  leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
  // Start silent
  osc.start();
  osc.amp(0);
  background(100,100,100);
  //Pentagrama
  stroke(color(0, 0, 0));
  strokeWeight(2);
  for (let j = 0; j < 5; j++){
    line(100, 200 + 50*j, sw-600, 200 + 50*j);
  }
  fill(0);
  rect(150, 150, 40, 300);
  //Teclas
  fill(255);
  for (let i = 0; i <= 7; i++){
    rect(ini + i * width, pianoY*3, width, pianoY);
  }
}

function draw()
{
  for (var i = 0; i < notas.length; i++) {
    notas[i].display();
    notas[i].update();
  }

  try{
    if (notas[0].pego((150 - notas[0].d * 20), 1)) {
      notas.splice(0,1);
      now -= 1;
      console.log(now);
    }
    if (notas[0].pego(150, 1)) {
      now +=1;
      console.log(now);
    }
  }catch(error){
    //console.error(error);
  }
  text("Puntos: " + puntos ,500 , 150)
}

function renderizarNotas(array){
  for (let i = 0; i < array.length; i++) {
    if (i==0) {
      array[i].x = sw-1500;
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

// When we click
function mousePressed() {
  // Map mouse to the key index
  if (mouseY > pianoY * 3){
    for (let i = 0; i < notes.length; i++){
      if (mouseX > (i * width)+ini && mouseX < (i+1) * width + ini){
        playNote(notes[i]);
        if (i == notas[now-1].n && notas[now-1].pego(150,40)) {
          console.log("niceee");
          puntos += 100;
        }else {
          console.log("pato Af");
          puntos -= 50;
        }
      }
    }
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.4);
}

function leer(nombre, _callback){       //this will read file and send information to other function
  var txt = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
      txt = xmlhttp.responseText;
      agregar(txt);
    }
  };
  xmlhttp.open("GET",nombre,true);
  xmlhttp.send();
  _callback();
}

function agregar(txt){
  console.log(txt);
  lineas = txt.split("/");
  for (var i = 0; i < lineas.length - 1; i++) {
    linea = lineas[i].split(",");
    notas.push(new Nota(parseInt(linea[0]),parseInt(linea[1]),parseInt(linea[2])))
    //console.log(notas[0].n);
  }
  renderizarNotas(notas);
}
