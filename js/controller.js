import GameModel from "./model.js";
import GameView from "./view.js";

// Controller
class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.moleInterval = null;
    this.snakeInterval = null;
    this.timerInterval = null;

    this.view.bindStartGame(this.startGame.bind(this));
    this.view.bindBlockClick(this.handleBlockClick.bind(this));
  }

  startGame() {
    this.model.reset();
    this.view.updateScore(this.model.score);
    this.view.updateTime(this.model.time);
    this.view.renderBoard(this.model.board);

    clearInterval(this.moleInterval);
    clearInterval(this.snakeInterval);
    clearInterval(this.timerInterval);

    this.moleInterval = setInterval(this.generateMole.bind(this), 1000);
    this.snakeInterval = setInterval(this.generateSnake.bind(this), 2000);
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
  }

  generateMole() {
    const emptyBlocks = this.model.board.filter(
      (block) => !block.hasMole && !block.hasSnake
    );
    if (emptyBlocks.length === 0) return;
    const randomBlock =
      emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
    randomBlock.hasMole = true;
    this.view.renderBoard(this.model.board);

    setTimeout(() => {
      randomBlock.hasMole = false;
      this.view.renderBoard(this.model.board);
    }, 2000);
  }

  generateSnake() {
    const randomBlock =
      this.model.board[Math.floor(Math.random() * this.model.board.length)];
    randomBlock.hasSnake = true;
    this.view.renderBoard(this.model.board);

    setTimeout(() => {
      randomBlock.hasSnake = false;
      this.view.renderBoard(this.model.board);
    }, 2000);
  }

  updateTimer() {
    this.model.time -= 1;
    this.view.updateTime(this.model.time);

    if (this.model.time <= 0) {
      clearInterval(this.moleInterval);
      clearInterval(this.snakeInterval);
      clearInterval(this.timerInterval);
      alert("Time is Over!");
    }
  }

  handleBlockClick(id) {
    const block = this.model.board.find((block) => block.id === id);
    if (block.hasMole) {
      block.hasMole = false;
      this.model.score += 1;
      this.view.updateScore(this.model.score);
    } else if (block.hasSnake) {
      this.model.board.forEach((b) => {
        b.hasSnake = true;
      });
      clearInterval(this.moleInterval);
      clearInterval(this.snakeInterval);
      clearInterval(this.timerInterval);
      alert("Game Over! You clicked on a snake!");
    }
    this.view.renderBoard(this.model.board);
  }
}

// Initialize the game
const gameModel = new GameModel();
const gameView = new GameView();
const gameController = new GameController(gameModel, gameView);
