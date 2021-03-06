`use strict`


const main = () => {

  const mainElement = document.querySelector('.container');

  buildDom = (html) => {
    mainElement.innerHTML = html;
  }

  function buildSplashScreen () {
    buildDom(`
      <section class="screen">
        <img class="logo" src="./images/logo.png" alt="Square Tetris">
        <button class="start button">START</button>
      </section>
    `);
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', buildGameSreen);
  }

  buildSplashScreen();
  
  function buildGameSreen () {
    buildDom(`
    <section class="game-container">
      <div class="game-info">
        <section class="next-square">
          <p class="next-info">Next square</p>
          <div class="container-next">
            <div id="display-next">
            </div>
          </div>
        </section>
        <p class="level"></p>
        <p class="score"></p>
      </div>
      <canvas class="game"></canvas>
    </section>
    `);

    const gameInfo = document.querySelector('.game-info');

    const gameContainerElement = document.querySelector('.game-container');
    const width = gameContainerElement.offsetWidth /2;
    const height = gameContainerElement.offsetHeight;
    const canvasElement = document.querySelector('.game');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    const game = new Game(canvasElement);

    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerHTML = `Score: ${game.score}`;

    const levelDisplay = document.querySelector('.level');
    levelDisplay.innerHTML = `Level: ${game.level}`;

    game.startLoop();

    game.setGameOverCallback(buildGameOverScreen);
    
    document.addEventListener('keydown',(event) => {
      
      switch (event.keyCode) {
        case 39:
          if(!game.activeSquare.isTouchingRight){
          game.activeSquare.goRight();
          }
          break;

        case 37:
          if(!game.activeSquare.isTouchingLeft){
            game.activeSquare.goLeft();
          }
          break;
        
        case 40:
          game.activeSquare.moveFaster();
          break;

        default:
          break;
      }

    })

    document.addEventListener('keyup', (event) => {
      
      switch (event.keyCode) {
        case 40:
          game.activeSquare.moveSlower();
          break;

        default:
          break;
      }
    })
  }



 function buildGameOverScreen () {
    buildDom(`
      <section class="screen">
      <h1>Game Over</h1>
      <button class="restart button">Start Again</button>
      </section>
    `);

    const restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', buildGameSreen);
  }
}

window.addEventListener('load', main);