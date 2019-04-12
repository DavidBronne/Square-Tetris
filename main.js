`use strict`


function main() {

  const mainElement = document.querySelector('.container');

  buildDom = function (html){
    mainElement.innerHTML = html;
  }



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
  buildSplashScreen();


  function buildGameSreen(){
    buildDom(`
    <section class="game-info">
      <img class="next-block" src="#" alt="next piece"></img>
    </section>
    <canvas class"game-container"></canvas>
  `);

    const gameInfo = document.querySelector('.game-info');
    const canvasElement = document.querySelector('.game-container')
















    // setTimeout(buildGameOverScreen, 3000);
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