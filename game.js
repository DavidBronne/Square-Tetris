`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.speed = 1;
  this.squaresStack = [];
  this.square = null;
}

Game.prototype.startLoop = function(){

  this.square = new Square(this.canvas);
  
  this.square.randomSize();
  this.square.draw();

  const loop = () => {
    this.square.clearSquare();
    this.square.goDown();
    this.square.draw();
    



    // window.requestAnimationFrame(loop)
  }
  setInterval(loop, 500 / this.speed)
  // window.requestAnimationFrame(loop)
}

Game.prototype.clearCanvas = function(){

}

Game.prototype.updateCanvas = function(){
  
}

Game.prototype.drawCanvas = function(){
  
}

Game.prototype.checkOverFlow = function(){
  
}

Game.prototype.setGameOver = function(){
  
}