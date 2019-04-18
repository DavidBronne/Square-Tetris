`use strict`

function Game (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.staticSquares = [];
  this.infoLines = [];

  this.score = 0;
  this.level = 1;
  
  this.gameOver = false;

  this.impactSound = new Audio ("sound/impact.wav");
  this.fullLineSound = new Audio ("sound/fullLine.wav");
  this.GameOverSound = new Audio ("sound/gameOver.wav");

  this.nextSquare;
  this.fast = 0;
}

Game.prototype.startLoop = function(){

  this.activeSquare = new MovingSquare(this.canvas, this.fast)
  this.nextSquare = new MovingSquare(this.canvas, this.fast)

  this.displayNextSquare()
  
  const loop = () => {

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
  this.impactSound.play();
  this.storeSquareToIndividualBlocks()
  this.CheckIfFullLine();

  this.activeSquare = this.nextSquare;
  this.nextSquare = new MovingSquare(this.canvas, this.fast)


  this.displayNextSquare()

}

Game.prototype.displayNextSquare = function(){
  
  const nextSqrDisplay = document.querySelector('#display-next')

  if(this.nextSquare.size === 25){
    nextSqrDisplay.setAttribute('class', 'size25')
  } else if(this.nextSquare.size === 50){
    nextSqrDisplay.setAttribute('class', 'size50')
  } else if(this.nextSquare.size === 75){
    nextSqrDisplay.setAttribute('class', 'size75')
  }
 
}


Game.prototype.storeSquareToIndividualBlocks = function(){

  const numOfLine = this.activeSquare.size / this.activeSquare.blockSize

  for(let i=0; i<numOfLine; i++){
    for(let j=0; j<numOfLine; j++){
      console.log(this.activeSquare.color);
      
      this.staticSquares.push(new StaticSquare(this.canvas, this.activeSquare.color, this.activeSquare.x + i* this.activeSquare.blockSize, this.activeSquare.y + j * this.activeSquare.blockSize, this.activeSquare.blockSize ))
  
    }
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

      this.GameOverSound.play();

      this.buildGameOverScreen()
    }
  });
}

Game.prototype.setGameOverCallback = function(buildGameOverScreen){
  this.buildGameOverScreen = buildGameOverScreen;
}


Game.prototype.CheckIfFullLine = function(){

  this.infoLines = [];
  let lineSizes;
  let possibleLines = [];

  var lineToCheck = () => {
    for (let i=0; i<=this.canvas.height - this.activeSquare.blockSize; i++ ){
      if(i%25 === 0) possibleLines.push(i)
    }
  } 
  lineToCheck()

  for(let i=0; i<possibleLines.length; i++){

    let InfoByLine = this.staticSquares.filter(function(obj){
      return obj.y === possibleLines[i];
    })

    
    if(InfoByLine){
      lineSizes = InfoByLine.map(function(obj){
        return obj.size;
      })
    }

    let totalSize;

    if(lineSizes.length > 0){
      totalSize = lineSizes.reduce((sum, obj)=>{
        return sum + obj;
      })
    }

    this.infoLines.push([possibleLines[i] , totalSize])
  }

  let linesToRemoveArr = [];
  this.linesToRemove = [];

  linesToRemoveArr = this.infoLines.filter((infos)=>{
    
    let result = (infos[1] === 250) 
    infos.pop();
    return result;
  })

  this.linesToRemove = linesToRemoveArr.map((obj)=>{
    return obj[0]
  })
  
  if(this.linesToRemove.length) {
    this.updateScore()
    this.updateLevel()
    this.animation()
  }
}

Game.prototype.updateScore = function(){
  this.score += this.linesToRemove.length * 250;
  this.displayScore()
}

Game.prototype.displayScore = function(){
  const scoreDisplay = document.querySelector('.score');
  scoreDisplay.innerHTML = `Score: ${this.score}`;
}


Game.prototype.updateLevel = function (){

  if(this.score > 0 && this.score % 500 === 0){
    this.fast += 2;
    this.level ++;
    this.displayLevelUp();
  }
}

Game.prototype.displayLevelUp = function(){
  const levelDisplay = document.querySelector('.level');
  levelDisplay.innerHTML = `Level: ${this.level}`;
}

Game.prototype.animation = function(){

  for (let i=0; i<this.linesToRemove.length; i++){

    let line = this.staticSquares.filter((obj) =>{
    return obj.y === this.linesToRemove[i]
    })

    line.forEach((obj) =>{
      obj.color = 'yellow'
    })
  }

  this.removeFullLine();
  
}

Game.prototype.removeFullLine = function(){
  
  this.fullLineSound.play();

  let newStack = this.staticSquares;

  let stacks =  []

    for(let i=0; i<this.linesToRemove.length ; i++){

      stacks.push(newStack.filter((obj) => {
        return obj.y < this.linesToRemove[i]
      }))
    }

    stacks.push(this.staticSquares)

    for(var i = stacks.length-1; i >= 0; i--){
      if(i !== 0){
        stacks[i] = stacks[i].filter((obj)=>{
          return obj.y > this.linesToRemove[i-1]
        })
      }
    }

    stacks.forEach((stack,index)=>{
      stack.forEach((square)=>{
        square.y += this.activeSquare.blockSize * (stacks.length-1-index)
      })
    })

    this.staticSquares = stacks.flat()
  
}