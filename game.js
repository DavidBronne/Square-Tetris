`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.square = null;
  this.speed = 1;

  this.staticSquares = [];
  this.infoLines = [];
  this.linesToRemove;

  this.score = 0;
  
  this.gameOver = false;
}

Game.prototype.startLoop = function(){

  this.activeSquare = new MovingSquare(this.canvas);

  
  const loop = () => {
   
  // console.log(this.score);

    this.isTouchingLeft()
    this.isTouchingRight()
    this.updateCanvas();
    this.clearCanvas();
    this.checkCollisions();
    this.checkOverFlow();
    this.drawCanvas();
    


    if(this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
  }

  loop();
}

// proto movement square

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
   
    const collidesTop = this.activeSquare.y < static.y + static.size;
    const collidesBottom = this.activeSquare.y + this.activeSquare.size > static.y;
    const collidesLeft = this.activeSquare.x < static.x  + static.size
    const collidesRight = this.activeSquare.x + this.activeSquare.size > static.x;

    if(collidesTop && collidesBottom && collidesLeft && collidesRight){
      this.activeSquare.y = static.y - this.activeSquare.size;
      this.hasCollided();
    }
  })
}



Game.prototype.isTouchingLeft = function () {

  this.activeSquare.isTouchingLeft = false;

  this.staticSquares.forEach((static) => {

    const touchesLeft = this.activeSquare.x === static.x  + static.size;
    const collidesBottom = this.activeSquare.y + this.activeSquare.size > static.y;
    const collidesTop = this.activeSquare.y < static.y + static.size;

    if(touchesLeft && collidesBottom && collidesTop) {
       this.activeSquare.isTouchingLeft = true;
    }
  })
}

Game.prototype.isTouchingRight = function () {

  this.activeSquare.isTouchingRight = false;
  this.staticSquares.forEach((static) => {

    const touchesRight = this.activeSquare.x +this.activeSquare.size === static.x;
    const collidesBottom = this.activeSquare.y + this.activeSquare.size > static.y;
    const collidesTop = this.activeSquare.y < static.y + static.size;

      if(touchesRight && collidesBottom && collidesTop){
        this.activeSquare.isTouchingRight = true;
      }
  })
}


Game.prototype.checkCollisions = function(){
  this.checkScreenCollision();
  this.checkSquareCollision();
}

Game.prototype.hasCollided = function(){
  // this.staticSquares.push(new StaticSquare(this.canvas,this.activeSquare.x,this.activeSquare.y,this.activeSquare.size));
  this.storeSquareToIndividualBlocks()
  this.CheckIfFullLine();

  //console.log(this.infoLines)

  this.activeSquare = new MovingSquare(this.canvas);
  //console.log(this.staticSquares);
}

Game.prototype.storeSquareToIndividualBlocks = function(){

  const numOfLine = this.activeSquare.size / this.activeSquare.blockSize

  for(let i=0; i<numOfLine; i++){
    for(let j=0; j<numOfLine; j++)
      this.staticSquares.push(new StaticSquare(this.canvas, this.activeSquare.color, this.activeSquare.x + i* this.activeSquare.blockSize, this.activeSquare.y + j * this.activeSquare.blockSize, this.activeSquare.blockSize ))
  }

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


// proto removing line

Game.prototype.CheckIfFullLine = function(){

  this.infoLines = [];
  let lineSizes;
  let possibleLines = [];

  var bottomToCheck = () => {
    for (let i=0; i<=this.canvas.height - this.activeSquare.blockSize; i++ ){
      if(i%25 === 0) possibleLines.push(i)
    }
  }
  bottomToCheck()
  //console.log(possibleLines)

  for(let i=0; i<possibleLines.length; i++){

    let InfoByLine = this.staticSquares.filter(function(obj){
      return obj.y === possibleLines[i];
    })

    
    if(InfoByLine){
      lineSizes = InfoByLine.map(function(obj){
        return obj.size;
      })
    }

    //console.log(lineSizes)

    let totalSize;

    if(lineSizes.length > 0){
      totalSize = lineSizes.reduce((sum, obj)=>{
        return sum + obj;
      })
    }

    //console.log(totalSize)

    this.infoLines.push([possibleLines[i] , totalSize])
  }

  let linesToRemoveArr = [];
  this.linesToRemove = [];

  linesToRemoveArr = this.infoLines.filter((infos)=>{
    
    let result = (infos[1] === 250) 
    infos.pop();
    return result;
  })

  //console.log('this.linesToRemoveArr', typeof(linesToRemoveArr), linesToRemoveArr)

  this.linesToRemove = linesToRemoveArr.map((obj)=>{
    return obj[0]
  })

//console.log('linesToRemove ', typeof(this.linesToRemove), this.linesToRemove)

  if(this.linesToRemove.length) this.RemoveFullLine()

  this.score += this.linesToRemove.length * 250;
  
}

Game.prototype.RemoveFullLine = function(){

  let newStack = this.staticSquares;

  // console.log(this.score);

    for(let i=0; i<this.linesToRemove.length ; i++){
      newStack = newStack.filter((obj) => {
        return obj.y !== this.linesToRemove[i];
      })
    }

    // console.log(newStack)

  this.staticSquares = newStack;

  this.staticSquares.forEach((obj) => {
    obj.y += this.activeSquare.blockSize * this.linesToRemove.length;
  })

  
}