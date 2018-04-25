let colores;
let pos;

function Nota(d, n, t){
  let sw = window.innerHeight;
  console.log(sw);
  this.d = d;
  this.n = n;
  this.t = t;
  this.x = sw*0.8;
  pos = [sw*0.5375, sw*0.5125, sw*0.4875, sw*0.4625, sw*0.4375, sw*0.4125, sw*0.3875, sw*0.3625];
  colores = [color(255, 102, 102), color(178, 255, 102), color(102, 178, 255), color(255, 255, 102), color(255, 102, 178), color(102, 255, 178), color(192, 192, 192), color(29,88 ,138)];

  this.display = function(){
    fill(colores[n]);
    rect(this.x, pos[n], d*20, sh*0.025);
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
