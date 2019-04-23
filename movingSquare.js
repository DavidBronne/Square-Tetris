`use strict`


class MovingSquare{
  constructor(canvas, fast) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.blockSize = this.canvas.width/10;
    this.random1to3 = (Math.floor(Math.random()*3) +1);

    this.x = this.canvas.width/2 - this.blockSize;
    this.y = 0;
    this.size = this.random1to3 * this.blockSize;

    this.direction = 0;

    this.isTouchingRight = false;
    this.isTouchingLeft = false;

    this.counter = 0
    this.fast = fast;
    this.speed = 30 - this.fast;
    this.regularSpeed = 30 - this.fast;

    this.color;

  }

  createBackground (){

    let smallSquare = new Image();
    smallSquare.src = 'images/blue.png';

    let mediumSquare = new Image();
    mediumSquare.src = 'images/pink.png';

    let bigSquare = new Image();
    bigSquare.src = 'images/yellow.png';

    this.possibleBackground = [smallSquare, mediumSquare, bigSquare];
    return this.color = this.possibleBackground[this.random1to3 - 1]
  }

  draw (){
      
    this.createBackground();

    this.ctx.fillStyle = this.ctx.createPattern(this.possibleBackground[this.random1to3 -1], 'repeat');
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  goRight (){
    this.x = this.x + this.blockSize;
  }

  goLeft (){
    this.x = this.x - this.blockSize;
  }

  moveFaster (){
    this.speed = 5;
  }

  moveSlower (){
    this.speed = this.regularSpeed;
  }

  update (){

  if(this.counter < this.speed){
    this.counter ++;
  }else{
    this.y = this.y + this.blockSize;
    this.counter = 0;
  }
  }
}

