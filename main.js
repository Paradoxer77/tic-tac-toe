const gamePieces = Array.from(document.getElementsByClassName("game-buttons"));
const start = document.getElementById("restart");
const playerTurn = document.getElementById("turn");
const bot = document.getElementById("bot");
const human = document.getElementById("human");

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
  return { board, checkWins, updateAndDisplay, showBoard };
})();

const player = (name, checker, nameID, scoreID) => {
  const playerName = name;
  const playerChecker = checker;
  let score = 0;
  let type = "human";

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

const botPlayer = (name, checker, nameID, scoreID) => {
  Object.create(player);

  const playerName = name;
  const playerChecker = checker;
  let score = 0;
  let type = "bot";

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

  return { playerName, displayName, increaseScore, type, move };
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

function gameReset() {
  for (i = 0; i < 9; i++) {
    update(i, "");
  }
  turn = "X";
  gameLength = 0;
  start.textContent = "Start";
  start.disabled = false;
  playerTurn.textContent = "Click to start";
}

let O = player("Player 2", "O", "player-two-name", "player-two-score");

bot.addEventListener("click", () => {
  bot.classList.add("active");
  human.classList.remove("active");
  gameReset();
  O = botPlayer("Bot", "O", "player-two-name", "player-two-score");
});

human.addEventListener("click", () => {
  human.classList.add("active");
  bot.classList.remove("active");
  gameReset();
  O = player("Player 2", "O", "player-two-name", "player-two-score");
});

start.addEventListener("click", () => {
  playerTurn.textContent = "Player 1's turn";
  for (i = 0; i < 9; i++) {
    gameBoard.updateAndDisplay(i, "");
  }
  startGame();
  start.disabled = true;
});

const X = player("Player 1", "X", "player-one-name", "player-one-score");

gamePieces.forEach((gamePiece) => {
  let i = gamePieces.indexOf(gamePiece);
  gamePiece.addEventListener("click", () => {
    if (gamePiece.textContent !== "X" && gamePiece.textContent !== "O") {
      if (turn === "X") {
        X.move(i);

        if (O.type === "bot" && gameLength < 8) {
          index = Math.floor(Math.random() * 8 + 1);
          while (
            gameBoard.board[index] === "X" ||
            gameBoard.board[index] === "O"
          ) {
            index = Math.floor(Math.random() * 8 + 1);
          }

          O.move(index);
          // turn = "X";
          // playerTurn.textContent = "Player 1's turn";
        } else {
          turn = "O";
          playerTurn.textContent = "Player 2's turn";
        }
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
