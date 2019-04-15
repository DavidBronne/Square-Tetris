`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.square = null;
  this.speed = 1;
  this.staticSquares = [];
  this.squareIsOver = true;
}

Game.prototype.startLoop = function(){

  this.squareIsOver = false
  this.activeSquare = new MovingSquare(this.canvas);

  
  const loop = () => {
    this.updateCanvas();
    this.clearCanvas();
    this.checkCollisions();
    this.drawCanvas();

    console.log(this.staticSquares)

    window.requestAnimationFrame(loop)
  }

  loop()
}

Game.prototype.checkScreenCollision = function() {

  if(this.activeSquare.x < 0){
    this.activeSquare.x = 0;
  }else if(this.activeSquare.x > this.canvas.width - this.activeSquare.size){
    this.activeSquare.x = this.canvas.width - this.activeSquare.size;
  }

  if(this.activeSquare.y > this.canvas.height - this.activeSquare.size){
    this.activeSquare.y = this.canvas.height - this.activeSquare.size
    this.hasCollided()
  }
}
Game.prototype.checkCollisions = function(){
  this.checkScreenCollision();
}

Game.prototype.hasCollided = function(){
  this.staticSquares.push(new StaticSquare(this.canvas,this.activeSquare.x,this.activeSquare.y,this.activeSquare.size))
  this.activeSquare = new MovingSquare(this.canvas)
}

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
}

Game.prototype.updateCanvas = function(){
  
  this.activeSquare.update()
}

Game.prototype.drawCanvas = function(){
  this.staticSquares.forEach((square)=>{
    square.draw()
  })
  this.activeSquare.draw()
}

Game.prototype.checkOverFlow = function(){
  
}

Game.prototype.setGameOver = function(){
  
}