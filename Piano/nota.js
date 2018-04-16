let colores;
let pos;

function Nota(d, n){
  this.d = d;
  this.n = n;
  this.x = screen.width - 600;
  pos = [425+12, 400+12, 375+12, 350+12, 325+12, 300+12, 275+12, 250+12];
  colores = [color(255, 102, 102), color(178, 255, 102), color(102, 178, 255), color(255, 255, 102), color(255, 102, 178), color(102, 255, 178), color(192, 192, 192)];

  this.display = function(){
    fill(colores[n]);
    rect(this.x, pos[n], d*20, 20);
  }

  this.pego = function() {
    var d = dist(this.x, pos[n], 190, pos[n]);
  }

  this.update = function(){
    this.x = this.x - 1;
  }
}
