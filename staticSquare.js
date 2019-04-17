  `use strict`


function StaticSquare(canvas,color,x,y,size) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d')

  this.x = x;
  this.y = y;
  this.size = size;
  this.blockSize = this.canvas.width/10;
  this.color = color;
}


StaticSquare.prototype.draw = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}
