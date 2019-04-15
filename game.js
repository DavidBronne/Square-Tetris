`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.square = null;
  this.speed = 1;
  this.staticSquares = [];
  
  this.gameOver = false;
}

Game.prototype.startLoop = function(){

  this.activeSquare = new MovingSquare(this.canvas);

  
  const loop = () => {
    this.isTouchingLeft()
    this.updateCanvas();
    this.activeSquare.isTouchingLeft = false;

    this.clearCanvas();
    this.checkCollisions();
    this.checkOverFlow();
    this.drawCanvas();


    // console.log(this.activeSquare.IsTouchingLeft);
    
    

    // console.log(this.staticSquares)

    if(this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
  }

  loop();
}

Game.prototype.checkScreenCollision = function() {

  if(this.activeSquare.x < 0){
    this.activeSquare.x = 0;
  }else if(this.activeSquare.x > this.canvas.width - this.activeSquare.size){
    this.activeSquare.x = this.canvas.width - this.activeSquare.size;
  }

  if(this.activeSquare.y > this.canvas.height - this.activeSquare.size){
    this.activeSquare.y = this.canvas.height - this.activeSquare.size;
    this.hasCollided();
  }
}

Game.prototype.checkSquareCollision = function(){
  this.staticSquares.forEach((static) => {


    const collisionYBottom = (this.activeSquare.y + this.activeSquare.size )> static.y;
    const collisionXBeginning = this.activeSquare.x >= static.x && this.activeSquare.x < (static.x + static.size);
    const collisionXEnd = (this.activeSquare.x + this.activeSquare.size) > static.x && (this.activeSquare.x + this.activeSquare.size) <= (static.x + static.size);
    const collisionYTop = this.activeSquare.y > (static.y + static.size);


    if (((collisionYBottom && collisionXBeginning) || (collisionYBottom && collisionXEnd)) && !collisionYTop)  {
      console.log('hasCollided')
      this.activeSquare.y = static.y - this.activeSquare.size
      this.hasCollided();
      return;
    } 
    
  })
}

Game.prototype.isTouchingLeft = function () {

  this.staticSquares.forEach((static) => {

    const collisionYBottom = (this.activeSquare.y + this.activeSquare.size) > static.y;
    const collisionYTop = this.activeSquare.y > (static.y + static.size);
    
    if(collisionYBottom && (this.activeSquare.x === (static.x + static.size)) && !collisionYTop) {
      console.log(true);
       this.activeSquare.isTouchingLeft = true;
       return;
    }else {
      console.log(false);
      this.activeSquare.isTouchingLeft = false;
      return
    }
      

  })

  // else if(collisionYTop){

    //   this.activeSquare.isTouchingLeft = false;
    //   console.log(false);
    //   return;
      
    // }
}

Game.prototype.checkCollisions = function(){
  this.checkScreenCollision();
  this.checkSquareCollision();
}

Game.prototype.hasCollided = function(){
  this.staticSquares.push(new StaticSquare(this.canvas,this.activeSquare.x,this.activeSquare.y,this.activeSquare.size));
  this.activeSquare = new MovingSquare(this.canvas);
}

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.updateCanvas = function(){
  this.activeSquare.update();
}

Game.prototype.drawCanvas = function(){
  this.staticSquares.forEach((square)=>{
    square.draw();
  })
  this.activeSquare.draw();
}





Game.prototype.checkOverFlow = function(){
  this.staticSquares.forEach((static) => {
    if(static.y < 0){
      this.gameOver = true;
      this.buildGameOverScreen()
    }
  });
}

Game.prototype.setGameOverCallback = function(buildGameOverScreen){
  this.buildGameOverScreen = buildGameOverScreen;
}