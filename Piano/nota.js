let colores;
let pos;

function Nota(d, n, t){
  this.d = d;
  this.n = n;
  this.t = t;
  this.x = screen.width - 600;
  pos = [425+12, 400+12, 375+12, 350+12, 325+12, 300+12, 275+12, 250+12];
  colores = [color(255, 102, 102), color(178, 255, 102), color(102, 178, 255), color(255, 255, 102), color(255, 102, 178), color(102, 255, 178), color(192, 192, 192), color(29,88 ,138)];

  this.display = function(){
    fill(colores[n]);
    rect(this.x, pos[n], d*20, 20);
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
