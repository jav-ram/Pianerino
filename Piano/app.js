// The midi notes of a scale
//               C        D        E        F        G        A        B        C
let notes = [ 261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883, 523.251];

// For automatically playing the song
let index = 0;

let trigger = 0;
let autoplay = false;
let osc;
let width = 100;
let pianoY = ((screen.height - 300) / 4);

function setup()
{
  createCanvas(screen.width - 500,screen.height - 300);
  // A triangle oscillator
  osc = new p5.SinOsc();
  background(100,100,100);



  // Start silent
  osc.start();
  osc.amp(0);
}

function draw()
{
  //Upper

  //Teclas
  fill(255);
  for (let i = 0; i < 7; i++){
    rect(i * width, pianoY*3, width, pianoY);
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
      if (mouseX > i * width && mouseX < (i+1) * width){
        playNote(notes[i]);
        console.log(i);
      }
    }
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.4);
}
