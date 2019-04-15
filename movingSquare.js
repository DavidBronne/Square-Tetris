`use strict`


function MovingSquare(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d')

  const blockSize = this.canvas.width/10;
  const random1to3 = (Math.floor(Math.random()*3) +1)

  this.x = this.canvas.width/2 - blockSize;
  this.y = 0;
  this.size = random1to3 * blockSize;

  this.direction = 0;
  this.currentSquare;
  this.nextSquare;

  this.counter = 0
  this.speed = 15;
}


MovingSquare.prototype.draw = function(){
  this.ctx.fillStyle = 'purple';
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

MovingSquare.prototype.goRight = function(){
  this.x = this.x + 2;
}

MovingSquare.prototype.goLeft = function(){
  this.x = this.x - 2;
}


MovingSquare.prototype.moveFaster = function(){
  this.speed = 5;
}

MovingSquare.prototype.moveSlower = function(){
  this.speed = 15;
}

MovingSquare.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
}

MovingSquare.prototype.update = function (){
 // this.x += this.direction * this.blockSize;
 if(this.counter < this.speed){
   this.counter ++
 }else{
  this.y = this.y + this.size/2;
  this.counter = 0;
 }
}
