const gamePieces = Array.from(document.getElementsByClassName("game-buttons"));
const start = document.getElementById("restart");
const playerTurn = document.getElementById("turn");
let turn = "X";
let gameLength = 0;

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const updateAndDisplay = (index, value) => {
    board[index] = value;
    gamePieces[index].innerHTML = value;
  };

  const showBoard = () => {
    return board;
  };

  const updateWins = () => {
    wins = [
      board.slice(0, 3).join(""),
      board.slice(3, 6).join(""),
      board.slice(6).join(""),
      [board[0], board[3], board[6]].join(""),
      [board[1], board[4], board[7]].join(""),
      [board[2], board[5], board[8]].join(""),
      [board[0], board[4], board[8]].join(""),
      [board[2], board[4], board[6]].join(""),
    ];
  };

  const checkWins = () => {
    updateWins();
    if (wins.includes("XXX")) {
      gameEnd(X);
    } else if (wins.includes("OOO")) {
      gameEnd(O);
    } else if (gameLength === 9) {
      gameEnd(null);
    }
  };
  return { checkWins, updateAndDisplay, showBoard };
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

  const move = (index) => {
    update(index, playerChecker);
  };
  return { playerName, displayName, increaseScore, move };
};

function startGame() {
  gamePieces.forEach((gamePiece) => {
    gamePiece.disabled = false;
  });
}

function update(i, checker) {
  gameBoard.updateAndDisplay(i, checker);
}

function gameEnd(player) {
  if (player) {
    playerTurn.textContent = `${player.playerName} wins`;
    player.increaseScore();
  } else {
    playerTurn.textContent = "Draw";
  }

  gamePieces.forEach((gamePiece) => {
    gamePiece.disabled = true;
  });
  turn = "X";
  gameLength = 0;

  start.textContent = "Play Again";
  start.disabled = false;
}

start.addEventListener("click", () => {
  playerTurn.textContent = "Player 1's turn";
  for (i = 0; i < 9; i++) {
    gameBoard.updateAndDisplay(i, "");
  }
  startGame();
  start.disabled = true;
});

const X = player("Player 1", "X", "player-one-name", "player-one-score");
const O = player("Player 2", "O", "player-two-name", "player-two-score");

gamePieces.forEach((gamePiece) => {
  let i = gamePieces.indexOf(gamePiece);
  gamePiece.addEventListener("click", () => {
    if (gamePiece.textContent !== "X" && gamePiece.textContent !== "O") {
      if (turn === "X") {
        X.move(i);
        turn = "O";
        playerTurn.textContent = "Player 2's turn";
      } else {
        O.move(i);
        turn = "X";
        playerTurn.textContent = "Player 1's turn";
      }

      gameLength++;
      gameBoard.checkWins();
    }
  });
});
