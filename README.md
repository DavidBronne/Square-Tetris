# TETRIS

## Description
Tetris is a game where the player have to stack blocks of diferent sizes to realize one full line. After this, the line disappears and the game continues. There is no end. The game is over when one one the piece get stuck to the top.


## MVP (DOM - CANVAS)
*CANVAS*, This is a game where the player can move and stack block.

## Backlog
- Speed Level
- Score
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
```

### block.js
```
block(){
  this.x;
  this.y;
  this.size;
  this.direction;
  this.speed;  
}

Character.prototype.setDirection(){
}

Character.prototype.goDown(){
}

Character.prototype.rush(){
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
- Block - create
- Block - goDown
- Game - checkOverFlow
- Block - setDirection
- Block - Rush
- Block - SelectRandomSize


## Links


### Trello
[Link url](https://trello.com/b/O2Molfl5/tetris)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/chloeleteinturier/Tetris)
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
