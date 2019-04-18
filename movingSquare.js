`use strict`


function MovingSquare(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d')

  this.blockSize = this.canvas.width/10;
  const random1to3 = (Math.floor(Math.random()*3) +1)

  this.x = this.canvas.width/2 - this.blockSize;
  this.y = 0;
  this.size = random1to3 * this.blockSize;

  this.direction = 0;
  this.currentSquare;
  this.nextSquare;

  this.isTouchingRight = false;
  this.isTouchingLeft = false;

  this.counter = 0
  this.speed = 30;

  this.possibleColors = ['#cc0099', '#333399', '#00cc66'];
  this.color = this.possibleColors[random1to3 -1]

  
}


MovingSquare.prototype.draw = function(){
  
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
}

MovingSquare.prototype.goRight = function(){
  this.x = this.x + this.blockSize;
}

MovingSquare.prototype.goLeft = function(){
  this.x = this.x - this.blockSize;
}


MovingSquare.prototype.moveFaster = function(){
  this.speed = 5;
}

MovingSquare.prototype.moveSlower = function(){
  this.speed = 15;
}


MovingSquare.prototype.update = function (){
 // this.x += this.direction * this.blockSize;
 if(this.counter < this.speed){
   this.counter ++;
 }else{
  this.y = this.y + this.blockSize;
  this.counter = 0;
 }
}
