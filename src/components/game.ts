import Bird from "./bird";
import Foreground from "./foreground";
import Pipe from "./pipe";
import Score from "./score";
import State from "./state";

require("../assets/background.png");
require("../assets/gameover.png");
require("../assets/title.png");

class Game {
  private state: State;
  private ctx: CanvasRenderingContext2D;
  private background: HTMLImageElement;
  private title: HTMLImageElement;
  private gameOver: HTMLImageElement;
  private bird: Bird;
  private foreground: Foreground;
  private pipes: Pipe[];
  private score: Score;
  private countFrame: number;
  private countDown: number;

  constructor(ctx: CanvasRenderingContext2D, state: State) {
    this.ctx = ctx;
    this.state = state;

    this.background = new Image();
    this.background.src = "./background.png";

    this.title = new Image();
    this.title.src = "./title.png";

    this.gameOver = new Image();
    this.gameOver.src = "./gameover.png";

    this.bird = new Bird(ctx, state);
    this.foreground = new Foreground(ctx, state);
    this.pipes = [];
    this.pipes.push(new Pipe(this.ctx, this.state));
    this.score = new Score(this.ctx, this.state);
    this.countFrame = 0;
    this.countDown = 180; // wait for 3s before sending pipes
  }

  render() {
    this.ctx.drawImage(this.background, 0, 0);

    if (this.state.screen.inGame || this.state.screen.endGame) {
      if (this.countDown > 0) this.countDown--;
      if (this.countDown == 0) {
        for (let pipe of this.pipes) {
          pipe.render();
        }
      }
      this.score.render();
      if (this.state.screen.endGame) {
        this.ctx.drawImage(this.gameOver, 48, this.state.height / 4);
        this.ctx.font = "30px Arial";
        this.ctx.strokeText(`Best score: ${this.state.score.best}`, 50, 100);
        this.ctx.font = "15px Arial";
        this.ctx.fillText("Press Enter to continue", 65, 300);
      }
    } else if (this.countDown == 180) {
      this.ctx.drawImage(this.title, 55, this.state.height / 4);
      this.ctx.font = "15px Arial";
      this.ctx.fillText("Press Space to play", 80, 350);
    }

    this.bird.render();

    this.foreground.render();
  }

  update() {
    this.foreground.update();

    if (this.state.screen.mainSreen && this.state.spaceDown) {
      this.state.changeScreen("inGame");
    }

    if (this.state.screen.inGame) {
      this.bird.update();

      if (this.countDown == 0) {
        this.countFrame++;
        if (this.countFrame == 90) {
          this.countFrame = 0;
          this.pipes = [new Pipe(this.ctx, this.state)].concat(this.pipes);
        }

        for (let pipe of this.pipes) {
          pipe.update();
          if (pipe.getX() == this.bird.getX() + this.bird.getBirdWidth()) {
            this.score.update();
          }
        }
      }

      if (
        this.pipes[this.pipes.length - 1].getX() <
        -this.pipes[this.pipes.length - 1].getWidth()
      )
        this.pipes.pop();

      console.log(this.pipes.length);

      if (this.state.spaceDown) {
        this.bird.jump();
        this.state.spaceDown = false;
      }

      let gameOver: boolean = this.checkGameOver();
      if (gameOver) {
        this.state.changeScreen("endGame");
        if (this.state.score.current > this.state.score.best) {
          this.state.score.best = this.state.score.current;
        }
      }
    }

    if (this.state.screen.endGame) {
      this.state.spaceDown = false;
      this.bird.update();
      if (this.state.enterDown) {
        this.state.changeScreen("mainSreen");
        this.bird.reset();
        this.pipes = [];
        this.pipes.push(new Pipe(this.ctx, this.state));
        this.score.reset();
        this.state.spaceDown = false;
        this.state.enterDown = false;
        this.countFrame = 0;
        this.countDown = 180;
      }
    }
  }

  checkGameOver(): boolean {
    for (let pipe of this.pipes) {
      if (
        (this.bird.getX() + this.bird.getBirdWidth() >= pipe.getX() &&
          this.bird.getX() <= pipe.getX() + pipe.getWidth() &&
          (this.bird.getY() <= pipe.getYtop() ||
            this.bird.getY() + this.bird.getBirdHight() - 10 >=
              pipe.getYbottom())) ||
        this.bird.getY() >= this.state.height - 110
      ) {
        return true;
      }
    }

    return false;
  }
}

export default Game;
