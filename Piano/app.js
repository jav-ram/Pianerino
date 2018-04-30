// The midi notes of a scale
//               C        D        E        F        G        A        B        C
let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
let now = 0, puntos = 0, index = 0, trigger = 0, autoplay = false;
let sw = window.innerWidth;
let sh = window.innerHeight;
let osc;
let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
let start, end, nactual, restart, separador = sw*0.01, largoTotal=0, rSlider;
let notas = [];

function setup()
{
  createCanvas(sw , sh);
  restart = loadImage("Assets/refresh2.png");
  // A triangle oscillator
  osc = new p5.SinOsc();

  leer("lecciones/prueba.txt", function(){console.log("Yei");});
  // Start silent
  osc.start();
  osc.amp(0);
}

function draw()
{
  //var r = rSlider.value();
  background(256,256,256);
  //Pentagrama
  stroke(color(0, 0, 0));
  //Pentagrama
  strokeWeight(2);
  for (let j = 0; j < 5; j++){
    line(sw*0.05, sh*0.3 + sh*0.05*j, sw*0.95, sh*0.3 + sh*0.05*j);
  }
  fill(0);
  rect(sw*0.1 , sh*0.25 , sw*0.02, sh*0.3);
  //Teclas
  fill(255);
  for (let i = 0; i <= 7; i++){
    rect(ini + i * width, pianoY*3, width, pianoY);
  }
  for (var i = 0; i < notas.length; i++) {
    if (notas[i].x < sw*0.9 && notas[i].x > sw*0.1 ) {
      notas[i].display();
    }
    notas[i].update();
  }

  try{
    if (notas[0].pego((sw*0.1 - notas[0].d * sw*0.02), 1)) {
      // notas.splice(0,1);
      // now -= 1;
      console.log(now);
    }
    if (notas[now].pego(sw*0.1, 1)) {
      now +=1;
      console.log(now);
    }
  }catch(error){
    //console.error(error);
  }
  fill(0);
  textSize(32);
  //text(str,x,y,x2,y2)
  text("Puntos: " + puntos , sw * 0.45 , sh * 0.2);
  image(restart ,sw*0.9 ,sh*0.03, sw*0.05, sw*0.05);

  try {
    let s = rSlider.value();
    rSlider.value(largoTotal - notas[notas.length-1].x + notas[notas.length-1].d*sw*0.02)
  } catch (e) {

  }

  try {
    if (notas[notas.length - 1].x < sw*0.1) {
      textSize(64);
      //text(str,x,y,x2,y2)
      text("TERMINO LA LECCION! \n OBTUVISTE " + puntos +" PUNTOS", sw * 0.3 , sh * 0.5);
      noLoop();
    }
  } catch (e) {

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
        if (i == notas[now].n && notas[now].pego(sw*0.1 ,60)) {
          console.log("niceee");
          puntos += 100;
        }else {
          console.log("pato Af");
          puntos -= 50;
        }
      }
    }
  }else if (mouseX > sw*0.90 && mouseY < sh*0.1) {
    restarterino();
  }
  try {
    console.log(rSlider.value());
  } catch (e) {
    console.log("no value yet Xd");
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
    notas.push(new Nota(parseInt(linea[0]),parseInt(linea[1]),parseInt(linea[2])));
    largoTotal = largoTotal + parseInt(linea[0])*sw*0.03 + separador;
  }
  largoTotal -= separador;
  console.log("largo Total " + largoTotal);
  try {
    rSlider.remove();
  } catch (e) {
    console.log("Aun no hay un slider");
  } finally {
    rSlider = createSlider(0, largoTotal, 0);
    rSlider.position(sw*0.2, sh * 0.6);
    rSlider.style('width', '60%');
  }
  renderizarNotas(notas);
}

function restarterino(){
  now = 0;
  largoTotal = 0;
  notas.length = 0;
  puntos = 0;
  loop();
  leer("lecciones/prueba.txt", function(){console.log("Yeah boii");});
}
