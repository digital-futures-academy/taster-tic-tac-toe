
const tiles = Array.from(document.querySelectorAll(`.tile`))
const playerDisplay = document.querySelector(`.display-player`);
const resetButton = document.querySelector(`#reset`);
const announcer = document.querySelector(`.announcer`);
let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
let currentPlayer = `X`;
let isGameActive = true;

const PLAYERX_WON = `PLAYERX_WON`;
const PLAYERO_WON = `PLAYERO_WON`;
const TIE = `TIE`;

/*
 Indexes within the board
 [0] [1] [2]
 [3] [4] [5]
 [6] [7] [8]
*/

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const changePlayer = () => {
  playerDisplay.classList.remove(`players${currentPlayer}`);
  currentPlayer = currentPlayer === `X` ? `O` : `X`;
  playerDisplay.textContent = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

const checkWinCondition = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === `` || b === `` || c === ``) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  return roundWon;
}

const handleResultValidation = () => {
  const winCondition = checkWinCondition();
  if (winCondition) {
    announce(currentPlayer === `X` ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return;
  }
  if (!board.includes(``)) announce(TIE);
}

const userAction = (tile, index) => {
  if (isValidAction(tile) && isGameActive) {
    tile.textContent = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

const isValidAction = tile => {
  if (tile.textContent === `X` || tile.textContent === `O`) {
    return false;
  }
  return true;
}

const announce = type => {
  switch (type) {
    case PLAYERO_WON:
      announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
      break;
    case PLAYERX_WON:
      announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
      break;
    case TIE:
      announcer.textContent = `Tie`;
  }
  announcer.classList.remove(`hide`);
}

const updateBoard = index => board[index] = currentPlayer;

const resetTiles = () => {
  tiles.forEach(tile => {
    tile.textContent = ``;
    tile.classList.remove(`playerX`);
    tile.classList.remove(`playerO`);
  });
}

const resetBoard = () => {
  board.fill(``, 0, board.length - 1);
  isGameActive = true;
  announcer.classList.add(`hide`);

  if (currentPlayer === `O`) changePlayer();
  resetTiles();
}

tiles.forEach((tile, index) => {
  tile.addEventListener(`click`, () => userAction(tile, index));
});

resetButton.addEventListener(`click`, resetBoard);
