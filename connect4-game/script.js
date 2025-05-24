const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let gameBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let board = document.getElementById("board");
let winnerDisplay = document.getElementById("winner");

function createBoard() {
  board.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }
}

function handleClick(event) {
  let col = +event.target.dataset.col;
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!gameBoard[row][col]) {
      gameBoard[row][col] = currentPlayer;
      updateCell(row, col);
      if (checkWinner(row, col)) {
        winnerDisplay.textContent = `${currentPlayer.toUpperCase()} wins!`;
        board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      return;
    }
  }
}

function updateCell(row, col) {
  const cells = board.querySelectorAll('.cell');
  const index = row * COLS + col;
  cells[index].classList.add(currentPlayer);
}

function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // horizontal
    checkDirection(row, col, 0, 1) || // vertical
    checkDirection(row, col, 1, 1) || // diagonal \
    checkDirection(row, col, 1, -1)   // diagonal /
  );
}

function checkDirection(row, col, dr, dc) {
  let count = 1;

  count += countCells(row, col, dr, dc);
  count += countCells(row, col, -dr, -dc);

  return count >= 4;
}

function countCells(row, col, dr, dc) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;

  while (
    r >= 0 && r < ROWS &&
    c >= 0 && c < COLS &&
    gameBoard[r][c] === currentPlayer
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}

createBoard();
