import State from "./state";

require("../assets/pipe-bottom.png");
require("../assets/pipe-top.png");

class Pipe {
  private ctx: CanvasRenderingContext2D;
  private state: State;
  private x: number;
  private hTop: number;
  private hBottom: number;
  private gap: number;
  private minHight: number;
  private velocity: number;
  private pipeBottom: HTMLImageElement;
  private pipeTop: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, state: State) {
    this.ctx = ctx;
    this.state = state;

    this.pipeBottom = new Image();
    this.pipeBottom.src = "./pipe-bottom.png";
    this.pipeTop = new Image();
    this.pipeTop.src = "./pipe-top.png";

    this.gap = 120;
    this.minHight = 60;

    this.x = this.state.width + this.pipeBottom.width;

    this.hTop = Math.floor(
      this.minHight | (Math.random() * (this.pipeTop.height - this.minHight))
    );

    this.hBottom = this.state.height - this.hTop - this.gap;

    this.velocity = 2;
  }

  getYtop(): number {
    return this.hTop;
  }

  getYbottom(): number {
    return this.hTop + this.gap;
  }

  getWidth(): number {
    return this.pipeBottom.width;
  }

  getX(): number {
    return this.x;
  }

  render() {
    this.ctx.drawImage(
      this.pipeTop,
      0,
      this.pipeTop.height - this.hTop, // change this v
      this.pipeTop.width,
      this.hTop, // change this
      this.x,
      0,
      this.pipeTop.width,
      this.hTop // change this
    );
    this.ctx.drawImage(
      this.pipeBottom,
      0,
      0,
      this.pipeBottom.width,
      this.hBottom,
      this.x,
      this.hTop + this.gap,
      this.pipeBottom.width,
      this.hBottom
    );
  }

  update() {
    this.x -= this.velocity;
  }
}

export default Pipe;
