const gamePieces = document.getElementsByClassName("game-buttons");
const start = document.getElementById("restart");

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const updateAndDisplay = (index, value) => {
    board[index] = value;
    gamePieces[index].innerHTML = value;
  };
  return { updateAndDisplay };
})();

const player = (name, checker, nameID, scoreID) => {
  const playerName = name;
  const playerChecker = checker;
  let score = 0;

  const displayName = () => {
    const displayPlayer = document.getElementById(nameID);
    displayPlayer.textContent = playerName;
  };

  const displayScore = () => {
    const playerScore = document.getElementById(scoreID);
    playerScore.textContent = score;
  };

  const increaseScore = () => {
    score++;
    displayScore();
  };
  return { displayName, increaseScore };
};

const X = player(1, "X", "player-one-name", "player-one-score");
const O = player(2, "O", "player-two-name", "player-two-score");

function startGame() {
  Array.from(gamePieces).forEach((gamePiece) => {
    let index = Array.from(gamePieces).indexOf(gamePiece);
    gamePiece.addEventListener("click", update.bind(null, index), false);
  });
}

function update(i) {
  gameBoard.updateAndDisplay(i, "X");
}

function gameEnd(player) {
  player.increaseScore();
  Array.from(gamePieces).forEach((gamePiece) => {
    gamePiece.disabled = true;
  });
}

start.addEventListener("click", startGame);
