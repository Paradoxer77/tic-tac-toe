const gamePieces = document.getElementsByClassName("game-buttons");

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

const X = player("Zoro", "X", "player-one-name", "player-one-score");
const O = player("Zura", "O", "player-two-name", "player-two-score");

(() => {
  Array.from(gamePieces).forEach((gamePiece) => {
    gamePiece.addEventListener("click", () => {
      let index = Array.from(gamePieces).indexOf(gamePiece);
      gameBoard.updateAndDisplay(index, "X");
    });
  });
})();
