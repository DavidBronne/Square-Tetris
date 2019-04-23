  `use strict`


class StaticSquare{
  constructor (canvas,color,x,y,size) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')

    this.x = x;
    this.y = y;
    this.size = size;
    this.blockSize = this.canvas.width/10;
    this.color = color;
}

  draw(){
    this.ctx.fillStyle = this.ctx.createPattern(this.color, 'repeat');
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

}