# SQUARE-TETRIS

## Description
Tetris is a game where the player have to stack blocks of different sizes to realize one full line. After this, the line disappears and the game continues. There is no end. The game is over when one one the piece get stuck to the top. This version is only with squares of different sizes.


## MVP (DOM - CANVAS)
*CANVAS*, This is a game where the player can move and stack block.

## Backlog
- Score
- Speed Level
- display the next square
- Bonus / Malus


## Data structure

### main.js
```

buildSplashScreen(){
}

buildGameScreen(){
}

buildGameOverScreen(){
}
```

### game.js
```
Game(){
  this.canvas;
}

Game.prototype.startLoop(){
}

Game.prototype.checkCollisions{
}

Game.prototype.CheckIfFullLine{
}

Game.prototype.updateLevel{
}

Game.prototype.checkOverFlow = function(){
}

Game.prototype.displayNextSquare{
}

Game.prototype.clearCanvas = function(){
}

Game.prototype.updateCanvas = function(){
}

Game.prototype.drawCanvas = function(){ 
}

Game.prototype.setGameOver = function(){
}
```

### movingSquare.js
```
MovingSquare(){
  this.camvas;
  this.x;
  this.y;
  this.size;
  this.direction;
  this.speed; 
  this.color;
}

MovingSquare.prototype.draw{
}

Character.prototype.setDirection(){
}

Character.prototype.goDown(){
}

Character.prototype.rush(){
}

```

### staticSquare.js
```
StaticSquare(){
  this.camvas;
  this.x;
  this.y;
  this.size;
  this.color;
}

StaticSquare.prototype.draw{
}

```


## States y States Transitions
```
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 
```

## Task
- Main - buildDom
- Main - buildSplashScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - buildGameOverScreen
- Game - buildCanvas
- Game - clearCanvas
- Game - updateCanvas
- Game - drawCanvas
- Game - setGameOver
- Game - collision
- Game - addEventListener
- movingSquare - create
- movingSquare - goDown
- staticSquare - store
- staticSquare - remove if full line
- Game - checkOverFlow
- movingSquare - setDirection
- movingSquare - Rush
- movingSquare - SelectRandomSize


## Links


### Trello
[Link url](https://trello.com/b/O2Molfl5/tetris)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/chloeleteinturier/Tetris)
[Link Deploy](https://chloeleteinturier.github.io/Tetris/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/12aWbkPZlli7qyOwh-r7aFmeflMeICDQl4ZWgLbv21e8/edit?usp=sharing)
