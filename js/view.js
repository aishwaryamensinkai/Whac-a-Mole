// View
class GameView {
  constructor() {
    this.scoreElement = document.getElementById("score");
    this.timerElement = document.getElementById("timer");
    this.boardElement = document.getElementById("game-board");
    this.startButton = document.getElementById("start-game");
  }

  renderBoard(board) {
    this.boardElement.innerHTML = "";
    board.forEach((block) => {
      const blockElement = document.createElement("div");
      blockElement.classList.add("block");
      blockElement.dataset.id = block.id;
      if (block.hasMole) {
        const mole = document.createElement("img");
        mole.src = "img/mole.jpg";
        mole.classList.add("mole");
        blockElement.appendChild(mole);
      }
      if (block.hasSnake) {
        const snake = document.createElement("img");
        snake.src = "img/snake.jpg";
        snake.classList.add("snake");
        blockElement.appendChild(snake);
      }
      this.boardElement.appendChild(blockElement);
    });
  }

  updateScore(score) {
    this.scoreElement.textContent = score;
  }

  updateTime(time) {
    this.timerElement.textContent = time;
  }

  bindStartGame(handler) {
    this.startButton.addEventListener("click", handler);
  }

  bindBlockClick(handler) {
    this.boardElement.addEventListener("click", (event) => {
      const blockElement = event.target.closest(".block");
      if (blockElement) {
        const id = parseInt(blockElement.dataset.id, 10);
        handler(id);
      }
    });
  }
}

export default GameView;
