const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
const newRoundButton = document.querySelector("#new-round");
const scoreO = document.querySelector("#score-o");
const scoreX = document.querySelector("#score-x");
const scoreDraw = document.querySelector("#score-draw");

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const scores = {
  O: 0,
  X: 0,
  draw: 0,
};

let currentPlayer = "O";
let board = Array(9).fill("");
let roundOver = false;

function renderScores() {
  scoreO.textContent = scores.O;
  scoreX.textContent = scores.X;
  scoreDraw.textContent = scores.draw;
}

function setStatus(message) {
  statusText.textContent = message;
}

function findWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], pattern };
    }
  }

  return null;
}

function endRound(result) {
  roundOver = true;

  if (result.winner) {
    scores[result.winner] += 1;
    setStatus(`Player ${result.winner} wins`);
    result.pattern.forEach((index) => cells[index].classList.add("winning-cell"));
  } else {
    scores.draw += 1;
    setStatus("Round drawn");
  }

  cells.forEach((cell) => {
    cell.disabled = true;
  });
  renderScores();
}

function playTurn(index) {
  if (roundOver || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer === "O" ? "mark-o" : "mark-x");
  cells[index].disabled = true;

  const result = findWinner();
  if (result) {
    endRound(result);
    return;
  }

  if (board.every(Boolean)) {
    endRound({ winner: null });
    return;
  }

  currentPlayer = currentPlayer === "O" ? "X" : "O";
  setStatus(`Player ${currentPlayer}'s turn`);
}

function resetBoard() {
  currentPlayer = "O";
  board = Array(9).fill("");
  roundOver = false;
  setStatus("Player O's turn");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("mark-o", "mark-x", "winning-cell");
  });
}

function resetGame() {
  scores.O = 0;
  scores.X = 0;
  scores.draw = 0;
  renderScores();
  resetBoard();
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => playTurn(index));
});

newRoundButton.addEventListener("click", resetBoard);
resetButton.addEventListener("click", resetGame);

renderScores();
