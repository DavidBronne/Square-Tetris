`use strict`

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.fixedSquares = [];
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

  startLoop(){

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

  checkScreenCollision() {

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

  checkSquareCollision(){
    this.fixedSquares.forEach((fixed) => {
    
      const collidesTop = this.activeSquare.y < fixed.y + fixed.size;
      const collidesBottom = this.activeSquare.y + this.activeSquare.size > fixed.y;
      const collidesLeft = this.activeSquare.x < fixed.x  + fixed.size
      const collidesRight = this.activeSquare.x + this.activeSquare.size > fixed.x;

      if(collidesTop && collidesBottom && collidesLeft && collidesRight){
        this.activeSquare.y = fixed.y - this.activeSquare.size;
        this.hasCollided();
      }
    })
  }



  isTouchingLeft () {

    this.activeSquare.isTouchingLeft = false;

    this.fixedSquares.forEach((fixed) => {

      const touchesLeft = this.activeSquare.x === fixed.x  + fixed.size;
      const collidesBottom = this.activeSquare.y + this.activeSquare.size > fixed.y;
      const collidesTop = this.activeSquare.y < fixed.y + fixed.size;

      if(touchesLeft && collidesBottom && collidesTop) {
        this.activeSquare.isTouchingLeft = true;
      }
    })
  }

  isTouchingRight () {

    this.activeSquare.isTouchingRight = false;
    this.fixedSquares.forEach((fixed) => {

      const touchesRight = this.activeSquare.x +this.activeSquare.size === fixed.x;
      const collidesBottom = this.activeSquare.y + this.activeSquare.size > fixed.y;
      const collidesTop = this.activeSquare.y < fixed.y + fixed.size;

        if(touchesRight && collidesBottom && collidesTop){
          this.activeSquare.isTouchingRight = true;
        }
    })
  }


  checkCollisions(){
    this.checkScreenCollision();
    this.checkSquareCollision();
  }

  hasCollided(){
    this.impactSound.play();
    this.storeSquareToIndividualBlocks()
    this.CheckIfFullLine();

    this.activeSquare = this.nextSquare;
    this.nextSquare = new MovingSquare(this.canvas, this.fast)

    this.displayNextSquare()
  }

  displayNextSquare(){
    
    const nextSqrDisplay = document.querySelector('#display-next')

    if(this.nextSquare.size === 25){
      nextSqrDisplay.setAttribute('class', 'size25')
    } else if(this.nextSquare.size === 50){
      nextSqrDisplay.setAttribute('class', 'size50')
    } else if(this.nextSquare.size === 75){
      nextSqrDisplay.setAttribute('class', 'size75')
    }
  }


  storeSquareToIndividualBlocks(){

    const numOfLine = this.activeSquare.size / this.activeSquare.blockSize

    for(let i=0; i<numOfLine; i++){
      for(let j=0; j<numOfLine; j++){       
        this.fixedSquares.push(new StaticSquare(this.canvas, this.activeSquare.color, this.activeSquare.x + i* this.activeSquare.blockSize, this.activeSquare.y + j * this.activeSquare.blockSize, this.activeSquare.blockSize ))
      }
    }
  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  updateCanvas(){
    this.activeSquare.update();
  }

  drawCanvas(){
    this.fixedSquares.forEach((square)=>{
      square.draw();
    })
    this.activeSquare.draw();
  }

  checkOverFlow(){
    this.fixedSquares.forEach((fixed) => {
      if(fixed.y < 0){
        this.gameOver = true;

        this.GameOverSound.play();

        this.buildGameOverScreen()
      }
    });
  }

  setGameOverCallback(buildGameOverScreen){
    this.buildGameOverScreen = buildGameOverScreen;
  }


  CheckIfFullLine(){

    this.infoLines = [];
    let lineSizes;
    let possibleLines = [];

    const lineToCheck = () => {
      for (let i=0; i<=this.canvas.height - this.activeSquare.blockSize; i++ ){
        if(i%25 === 0) possibleLines.push(i)
      }
    } 
    lineToCheck()

    for(let i=0; i<possibleLines.length; i++){

      let InfoByLine = this.fixedSquares.filter(function(obj){
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

  updateScore(){
    this.score += this.linesToRemove.length * 250;
    this.displayScore()
  }

  displayScore(){
    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerHTML = `Score: ${this.score}`;
  }


  updateLevel (){

    if(this.score > 0 && this.score % 500 === 0){
      this.fast += 2;
      this.level ++;
      this.displayLevelUp();
    }
  }

  displayLevelUp(){
    const levelDisplay = document.querySelector('.level');
    levelDisplay.innerHTML = `Level: ${this.level}`;
  }

  animation(){

    for (let i=0; i<this.linesToRemove.length; i++){

      let line = this.fixedSquares.filter((obj) =>{
      return obj.y === this.linesToRemove[i]
      })

      line.forEach((obj) =>{
        let smallSquare = new Image();
        smallSquare.src = 'images/grey.png'
        obj.color = smallSquare;
      })
    }
    setTimeout(() => {
      this.removeFullLine();
    },100)
    
  }


  removeFullLine(){
    
    this.fullLineSound.play();

    let newStack = this.fixedSquares;

    let stacks =  []

      for(let i=0; i<this.linesToRemove.length ; i++){

        stacks.push(newStack.filter((obj) => {
          return obj.y < this.linesToRemove[i]
        }))
      }

      stacks.push(this.fixedSquares)

      for(let i = stacks.length-1; i >= 0; i--){
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

      this.fixedSquares = stacks.flat()
    
  }
}