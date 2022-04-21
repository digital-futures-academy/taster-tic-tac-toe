// Make an array filled with all of the elements on the page that have a class attribute of tile
const tiles = Array.from(document.querySelectorAll(`.tile`));
// Get the first element that has the class attribute display
const display = document.querySelector(`.display`);
// Get the first element that has the class attribute display-player
const playerDisplay = document.querySelector(`.display-player`);
// Get the first element with the id of reset
const resetButton = document.querySelector(`#reset`);
// Get the first element with a class attribute of announcer
const announcer = document.querySelector(`.announcer`);

// Set some constants to use
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

// Set some variables with initial values

let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
let currentPlayer = `X`;
let isGameActive = true;

// Define the functions that make the game play
// Swap the player from one to the other
const changePlayer = () => {
  // Remove the playerX or playerO class from the playerDisplay element
  playerDisplay.classList.remove(`/* Replace Me 1 */`);
  // Swap current player from X to O or O to X
  currentPlayer = currentPlayer === `X` ? `O` : `X`;
  // Display which player's turn it is
  playerDislay.textContent = currentPlayer;
  // Add the playerX class or playerO class to the element
  playerDisplay.classList.add(`/* Replace Me 2 */`);
};

// See if the last move caused a win condition
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
  /* REPLACE ME 3 - Add a line here to return the value of roundWon */
};

// Check for a winner and make the result display
const handleResultValidation = () => {
  const winCondition = false; /* REPLACE ME 4 - Make winCondition the result of a call to checkWinCondition */
  if (winCondition) {
    /* REPLACE ME 5 - Call annouce with PLAYERX_WON if currentPlayer is X or PLAYERO_WON if not */
    isGameActive = false;
    return;
  }
  /* REPLACE ME 6 - declare a TIE if the board array does not include an empty string */
};

// Execute when a player clicks on the board
const userAction = (tile, index) => {
  // if the user action is valid on the tile AND the game is active
  if (isValidAction(tile) && isGameActive) {
    /* REPLACE ME 7 - put the player's mark in the tile *?
    /* REPLACE ME 8 - add the player to the classList on the tile */
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
};

// Check to see if the user is allowed to click on that tile
const isValidAction = (tile) => {
  /* REPLACE ME 9 - return true unless the textContent of the tile is X or O */
};

// Declare the winner on the page
const announce = (type) => {
  // Use the case that matches type
  switch (type) {
    case PLAYERO_WON:
      // Change the HTML in the element with the announcer class to the player who won
      announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
      break;
    case PLAYERX_WON:
      // Change the HTML in the element with the announcer class to the player who won
      announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
      break;
    case TIE:
      // Change the HTML in the element with the announcer class to a tie result
      announcer.innerHTML = `Tie`;
  }
  // Allow the announcer element to show by removing it's hide class
  announcer.classList.remove(`hide`);
  // Remove the Player Display
  display.classList.add(`hide`);
};

// Update the board with the last valid move
const updateBoard = (index) => (board[index] = currentPlayer);

// Reset all of the tiles on the board to the default
const resetTiles = () => {
  // visit each tile 
  tiles.forEach(tile => {
    // and set the content to an empty string
    tile.textContent = ``;
    // then remove player classes
    tile.classList.remove(`playerX`);
    tile.classList.remove(`playerO`);
  })
};

// Clear the board ready for a new game
const resetBoard = () => {
  // Make every element in the board array an empty string
  board.fill(``, 0, board.length - 1);
  isGameActive = true;
  // Hide the "winner" text
  announcer.classList.add(`hide`);
  // Display the "player" text
  display.classList.remove(`hide`);
  // Make X the current player
  if (currentPlayer === `O`) changePlayer();
  // Reset the tiles
  resetTiles();
};

// Make each tile know that it can be clicked and what to do when it is
/* REPLACE ME 10 - visit each tile and index, attaching an click event listener and calling userAction with the tile and the index */

// Make the reset button know what to do when it is clicked
/* REPLACE ME 11 - tell the resetButton to call resetBoard when clicked */