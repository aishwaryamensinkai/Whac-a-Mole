// Model
class GameModel {
  constructor() {
    this.score = 0;
    this.time = 30;
    this.board = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      hasMole: false,
      hasSnake: false,
    }));
  }

  reset() {
    this.score = 0;
    this.time = 30;
    this.board.forEach((block) => {
      block.hasMole = false;
      block.hasSnake = false;
    });
  }
}

export default GameModel;
