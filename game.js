`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.square = null;
  this.speed = 1;
  this.squaresStack = [];
  this.squareIsOver = true;
}

Game.prototype.startLoop = function(){

  this.squareIsOver = false
  this.square = new Square(this.canvas);
  this.square.randomSize();
  this.square.draw();

  const loop = () => {
    this.moveSquare();

    if(this.squareIsOver) {
      clearInterval(intervalId);
      this.square = null;
      this.startLoop()
      window.requestAnimationFrame(loop)
    }
  }
  let intervalId = setInterval(loop, 500 / this.speed);

  const addInStack = () => {

    

    
  }
  
  
  window.requestAnimationFrame(loop)
}


Game.prototype.moveSquare = function(){
  this.square.clearSquare();
  this.square.goDown();
  this.CheckSquareOver();
  this.square.draw();
  
}

Game.prototype.lateralMove = function(){
  this.square.clearSquare();
  this.square.update();
  this.checkScreenCollision();
  this.square.draw();
  this.square.setDirection(0);
}

Game.prototype.checkScreenCollision = function(){
  if(this.square.x < 0){
    this.square.x = 0;
  }else if(this.square.x > this.canvas.width - this.square.size){
    this.square.x = this.canvas.width - this.square.size;
  }
}

Game.prototype.CheckSquareOver = function(){
  if(this.square.y > this.canvas.height - this.square.size){
    this.square.y = this.canvas.height - this.square.size;
    this.squareIsOver = true;
    this.squaresStack.push(this.square);
    console.log(this.squaresStack);
    return true;
  }
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