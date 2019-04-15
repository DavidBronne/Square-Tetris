`use strict`


function main() {

  const mainElement = document.querySelector('.container');

  buildDom = function (html){
    mainElement.innerHTML = html;
  }

  buildSplashScreen();

  function buildSplashScreen(){
    buildDom(`
      <section>
        <h1>TETRIS</h1>
        <button class="start-button">START</button>
      </section>
    `);
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', buildGameSreen);
  }
  
  function buildGameSreen(){
    buildDom(`
    <section class="game-container">
      <div class="game-info">
        <img class="next-block" src="#" alt="next piece"></img>
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

    game.startLoop();

    game.setGameOverCallback(buildGameOverScreen);


  


    document.addEventListener('keydown', function (event) {
      
      switch (event.keyCode) {
        case 39:
          game.activeSquare.goRight()
          break;

        case 37:
          
          console.log(game.activeSquare.isTouchingLeft);
          
          if(!game.activeSquare.isTouchingLeft){
            game.activeSquare.goLeft()
          }
          break;
        
        case 40:
          game.activeSquare.moveFaster();
          break;

        default:
          break;
      }

    })

    document.addEventListener('keyup', function (event) {
      
      switch (event.keyCode) {
        
        case 40:
          game.activeSquare.moveSlower();
          break;

        default:
          break;
      }

    })

    }



  function buildGameOverScreen(){
    buildDom(`
      <section>
      <h1>Game Over</h1>
      <button class="restart-button">Start Again</button>
      </section>
    `);

    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', buildGameSreen);
  }




}

window.addEventListener('load', main);