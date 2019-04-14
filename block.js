`use strict`


function Square(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d')

  this.blockSize = this.canvas.width/10;

  this.x = this.canvas.width/2 - this.blockSize;
  this.y = 0;
  this.size;


  this.speed = 1;
  this.direction = 0;
  this.currentSquare;
  this.nextSquare;
}

Square.prototype.randomSize = function() {
  let random1to3 = (Math.floor(Math.random()*3) +1)
  this.size = random1to3 * this.blockSize;
}

Square.prototype.draw = function(){
  this.ctx.fillStyle = 'purple';
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

Square.prototype.goDown = function(){
  this.y = this.y + this.blockSize;
}

Square.prototype.clearSquare = function(){
  this.ctx.clearRect(this.x, this.y, this.size, this.size)
}

