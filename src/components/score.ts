import State from "./state";

require("../assets/0.png");
require("../assets/1.png");
require("../assets/2.png");
require("../assets/3.png");
require("../assets/4.png");
require("../assets/5.png");
require("../assets/6.png");
require("../assets/7.png");
require("../assets/8.png");
require("../assets/9.png");

class Score {
  private ctx: CanvasRenderingContext2D;
  private state: State;
  private x: number;
  private y: number;
  private listScoreImg: HTMLImageElement[];

  constructor(ctx: CanvasRenderingContext2D, state: State) {
    this.ctx = ctx;
    this.state = state;
    this.x = this.state.width / 2;
    this.y = 20;

    this.listScoreImg = [];

    for (let i = 0; i < 10; i++) {
      this.listScoreImg.push(new Image());
      this.listScoreImg[i].src = `./${i}.png`;
    }
  }

  render() {
    if (this.state.score.current < 10) {
      this.ctx.drawImage(
        this.listScoreImg[this.state.score.current],
        this.x,
        this.y
      );
    } else if (this.state.score.current < 100) {
      const a: number = Math.floor(this.state.score.current / 10);
      const b: number = this.state.score.current % 10;
      this.ctx.drawImage(this.listScoreImg[a], this.x - 24, this.y);
      this.ctx.drawImage(this.listScoreImg[b], this.x, this.y);
    } else {
    }

    // if (this.state.screen.endGame) {
    //     if (this.state.score.best < 10) {
    //         this.ctx.drawImage(
    //           this.listScoreImg[this.state.score.best],
    //           this.x,
    //           this.y
    //         );
    //       } else if (this.state.score.best < 100) {
    //         const a: number = Math.floor(this.state.score.best / 10);
    //         const b: number = this.state.score.best % 10;
    //         this.ctx.drawImage(this.listScoreImg[a], this.x - 24, this.y);
    //         this.ctx.drawImage(this.listScoreImg[b], this.x, this.y);
    //       } else {
    //       }
    // }
  }

  update() {
    this.state.score.current++;
  }

  reset() {
    this.state.score.current = 0;
  }
}

export default Score;
