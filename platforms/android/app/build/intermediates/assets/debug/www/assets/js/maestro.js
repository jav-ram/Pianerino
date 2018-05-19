// The midi notes of a scale
//               C        D        E        F        G        A        B        C
let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];
let now = 1, index = 0, trigger = 0, autoplay = false;
let sw = window.innerWidth;
let sh = window.innerHeight;
let osc, del, upload;
let width = sw*0.06, pianoY = (sh*0.23), pentaY = (sh/4)/5, ini = (sw - width * 8)/2;
let start, end, nactual;
var db = firebase.firestore();
let notas = [];
let offset = sw*0.2, separador = sw*0.01;
let enTeclado = false;

function setup()
{
  del = loadImage("assets/imgs/delete2.png");
  upload = loadImage("assets/imgs/upload2.png");
  var canvas = createCanvas(sw ,sh);

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
    line(sw*0.05, sh*0.3 + sh*0.05*j, sw*0.95, sh*0.3 + sh*0.05*j);
  }
  //Linea de "meta"
  fill(0);
  rect(sw*0.1 , sh*0.25 , sw*0.02, sh*0.3);
  //Teclas
  fill(255);
  for (let i = 0; i <= 7; i++){
    rect(ini + i * width, pianoY*3, width, pianoY);
  }

  renderizarNotas(notas);
  for (var i = 0; i < notas.length; i++) {
    if (notas[i].x < sw*0.9 && notas[i].x > sw*0.1 ) {
      notas[i].display();
    }
  }

  textSize(32);
  text("Borrar",sw*0.9, sh*0.1)
  image(del,0, sh*0.03, sw*0.05, sw*0.05);
  image(upload, sw*0.05, sh*0.03, sw*0.05, sw*0.05);
  // image(img,x,y,width,height)
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
  //Si presiona el boton de borrar
  if (mouseX > sw*0.9 && mouseY < sh*0.1) {
    borrarNota();
    console.log("borrado prro");
  }else if (mouseX < sw*0.05 && mouseY < sh*0.1) {
    borrarTodoToditoTodo();
  }else if (mouseX > sw*0.05 && mouseX < sw*0.1 && mouseY < sh*0.1) {
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
   resizeCanvas(windowWidth, windowHeight);
   sw =windowWidth;
   sh = windowHeight;
   width = sw*0.06;
   pianoY = (sh*0.23);
   pentaY = (sh/4)/5;
   ini = (sw - width * 8)/2;
   separador = sw*0.01;
}
