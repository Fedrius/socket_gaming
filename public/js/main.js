document.addEventListener('DOMContentLoaded', initializeGame);

let gameGrid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let playerWon = false;
let turnCounter = 0;
let players = ['X','O'];
//this will change based on who will go first.. later
let playerTurn = 0;

function initializeGame() {
  addGameClickHandlers();
  gameReset();
  bulmaComponents();
}

function addGameClickHandlers() {
  let gridSquares = document.querySelectorAll('.gridSquare');
  for (let gridSquaresIndex = 0; gridSquaresIndex < gridSquares.length; gridSquaresIndex++) {
    // Resetting here so don't have to loop again in another func
    gridSquares[gridSquaresIndex].removeEventListener('click', gameEventHandler);
    gridSquares[gridSquaresIndex].textContent = '';
    gridSquares[gridSquaresIndex].classList.remove('disableClick');
    //
    gridSquares[gridSquaresIndex].addEventListener('click', gameEventHandler);
  }
}

function gameEventHandler(event) {
  console.log('id:', event.target.getAttribute('id'));
  console.log('row:', event.target.getAttribute('row'));
  console.log('col:', event.target.getAttribute('col'));

  let sqr = event.target.getAttribute('id');
  let row = event.target.getAttribute('row');
  let col = event.target.getAttribute('col');
  
  // gameGrid[row][col] = players[playerTurn];
  // event.target.textContent = players[playerTurn];
  // event.target.classList.add('disableClick');
  // // playerTurn = 1-playerTurn;

  // diagonalWinCheck('Player 1');
  // horizontalWinCheck(row, null, 'Player 1');
  // verticalWinCheck(row, col, 'Player 1');

  // turnCounter++;
  // if (turnCounter === 9 && !playerWon) {
  //   console.log('draw');

  //   document.getElementById('gameTitle').textContent = 'Draw'
  // } else if (!playerWon) {
  //   computerAI('easy');
  // }

  // console.log(gameGrid);


  socket.emit('createGameMove', {
    sqr,
    row,
    col,
    player: 'O'
  });
}

//0,0
function verticalWinCheck(row, col, player) {
  let matchCounter = 0;

  for (let i = 0; i <= 2; i++) {
    if ((gameGrid[i][col] !== 0) && (gameGrid[0][col] === gameGrid[i][col])) {
      matchCounter++
    }
  }

  if (matchCounter === 3) {
    disableAllSquares();
    console.log('vertical winnnn');
    playerWon = true;

    document.getElementById('gameTitle').textContent = `${player} wins`;
  }
}

function horizontalWinCheck(row, col, player) {
  let matchCounter = 0;

  for (let i = 1; i < gameGrid[row].length; i++) {
    if ((gameGrid[row][i] !== 0) && (gameGrid[row][0] === gameGrid[row][i])) {
      matchCounter++;
    }
  }

  if (matchCounter === 2) {
    disableAllSquares();
    console.log('horizontal winn');
    playerWon = true;

    document.getElementById('gameTitle').textContent = `${player} wins`;
  }
}

function diagonalWinCheck(player) {
  let matchCounter1 = 0;
  let matchCounter2 = 0;

  for (let i = 0; i <= 2; i++) {
    if ((gameGrid[i][i] !== 0) && (gameGrid[0][0] === gameGrid[i][i])) {
      matchCounter1++;
    }
  }

  for (let i = 0, k = 2; i <= 2, k >= 0; i++, k--) {
    if ((gameGrid[i][k] !== 0) && (gameGrid[0][2] === gameGrid[i][k])) {
      matchCounter2++;
    }
  }

  if (matchCounter1 === 3 || matchCounter2 === 3) {
    disableAllSquares();
    console.log('diagonal win');
    playerWon = true;

    document.getElementById('gameTitle').textContent = `${player} wins`;
  }
}

function disableAllSquares() {
  let gridSquares = document.querySelectorAll('.gridSquare');
  for (let gridSquaresIndex = 0; gridSquaresIndex < gridSquares.length; gridSquaresIndex++) {
    gridSquares[gridSquaresIndex].classList.add('disableClick');
  }
}

function computerAI(mode) {
  let gridSquares = document.querySelectorAll('.gridSquare');
  let row = null;
  let col = null;
  let randomIndex = null;
  let emptySquares = [];

  console.log('ai start');
  
  for (let gridSquaresIndex = 0; gridSquaresIndex < gridSquares.length; gridSquaresIndex++) {
    if (gridSquares[gridSquaresIndex].textContent === '') {
      emptySquares.push(gridSquares[gridSquaresIndex]);
      console.log('empty square found');
    }
  }
  console.log(emptySquares);

  if (mode === 'easy') {
    randomIndex = Math.floor(Math.random() * emptySquares.length);
    row = emptySquares[randomIndex].getAttribute('row');
    col = emptySquares[randomIndex].getAttribute('col');
  
    gameGrid[row][col] = players[1];
    emptySquares[randomIndex].textContent = players[1];
    emptySquares[randomIndex].classList.add('disableClick');
  } else {
    //hard mode coding
  }

  turnCounter++;
  diagonalWinCheck('Player 2');
  horizontalWinCheck(row, null, 'Player 2');
  verticalWinCheck(row, col, 'Player 2');

  if (turnCounter === 9 && !playerWon) {
    console.log('draw');

    document.getElementById('gameTitle').textContent = 'Draw'
  }
  
  console.log('ai stopped');
}

function gameReset() {
  document.getElementById('resetBtn').addEventListener('click', () => {
    gameGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    playerWon = false;
    turnCounter = 0;
    document.getElementById('gameTitle').textContent = 'Tic Tac Toe';
    addGameClickHandlers();
  });
}

function bulmaComponents() {
    // Get all 'navbar-burger' elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the 'data-target' attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the 'is-active' class on both the 'navbar-burger' and the 'navbar-menu'
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
}