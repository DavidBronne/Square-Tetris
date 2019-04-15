  `use strict`


function StaticSquare(canvas,x,y,size) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d')

  this.x = x;
  this.y = y;
  this.size = size;
}


StaticSquare.prototype.draw = function(){
  this.ctx.fillStyle = 'purple';
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}
