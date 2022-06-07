import State from "./state";

require("../assets/foreground.png");

class Foreground {
  private ctx: CanvasRenderingContext2D;
  private state: State;
  private img: HTMLImageElement;
  private x: number;

  constructor(ctx: CanvasRenderingContext2D, state: State) {
    this.ctx = ctx;
    this.state = state;

    this.img = new Image();
    this.img.src = "./foreground.png";
    this.x = 0;
  }

  render() {
    this.ctx.drawImage(this.img, this.x, 420);
  }

  update() {
    if (this.state.screen.inGame || this.state.screen.mainSreen) {
      this.x -= 2;
      if (Math.abs(this.x) > 16) {
        this.x = 0;
      }
    }
  }
}

export default Foreground;
