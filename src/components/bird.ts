import State from "./state";

require("../assets/bluebird-midflap.png");
require("../assets/bluebird-downflap.png");
require("../assets/bluebird-upflap.png");

class Bird {
  private ctx: CanvasRenderingContext2D;
  private state: State;
  private birdImg: HTMLImageElement;
  private x: number;
  private y: number;
  private velocity: number;
  private angle: number;
  private degree: number;

  private countFrame: number;
  private images: string[];
  private index: number;

  private countDown: number = 30;

  private readonly initialVelocity: number = 5;
  private readonly maxFallDownVelocity: number = 8;
  private readonly maxGoUpVelocity: number = -4;
  private readonly upForce: number = -6;

  constructor(ctx: CanvasRenderingContext2D, state: State) {
    this.ctx = ctx;
    this.state = state;

    this.images = [
      "./bluebird-midflap.png",
      "./bluebird-downflap.png",
      "./bluebird-upflap.png",
    ];
    this.index = 0;
    this.birdImg = new Image();
    this.birdImg.src = this.images[this.index];

    this.x = this.state.width / 3;
    this.y = this.state.height / 2;
    this.velocity = this.initialVelocity;
    this.angle = 6;
    this.degree = 0;

    this.countFrame = 0;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getBirdWidth(): number {
    return this.birdImg.width;
  }

  getBirdHight(): number {
    return this.birdImg.height;
  }

  render() {
    if (this.countDown > 0) this.countDown--;

    // flaping block
    if (this.state.screen.inGame || this.state.screen.mainSreen) {
      this.countFrame++;

      if (this.countFrame > 5) {
        this.countFrame = 0;
        this.index++;
        if (this.index >= this.images.length) this.index = 0;
        this.birdImg.src = this.images[this.index];
      }
    }

    // rotate
    if (this.state.screen.inGame || this.state.screen.endGame) {
      this.ctx.save();
      this.ctx.translate(this.x + this.birdImg.width / 2, this.y);

      if (this.velocity == this.maxFallDownVelocity && this.countDown == 0) {
        this.degree = this.velocity * 2 + this.angle;
        if (this.degree > 90) this.degree = 90;
        this.ctx.rotate((this.degree * Math.PI) / 180);
        this.angle += 6;
      } else {
        if (this.degree > -10) this.degree -= 10;
        this.ctx.rotate((this.degree * Math.PI) / 180); // delete * 2
        this.angle = 2;
      }

      this.ctx.drawImage(
        this.birdImg,
        -this.birdImg.width / 2,
        -this.birdImg.height / 2
      );
      this.ctx.restore();
    } else if (this.state.screen.mainSreen) {
      this.ctx.drawImage(this.birdImg, this.x, this.y);
    }
  }

  renderChillingBird() {}

  update() {
    if (
      this.state.screen.inGame ||
      (this.state.screen.endGame && this.y <= 410)
    ) {
      this.velocity += 0.4;
      this.y += this.velocity;
      if (this.state.spaceDown) this.velocity = 0;

      if (this.velocity > this.maxFallDownVelocity)
        this.velocity = this.maxFallDownVelocity;
      // if (this.velocity < this.upForce) this.velocity = this.maxGoUpVelocity;
    }
  }

  jump() {
    this.velocity += this.upForce;
    // this.y = this.upForce;
  }

  reset() {
    this.index = 0;
    this.x = this.state.width / 3;
    this.y = this.state.height / 2;
    this.velocity = this.initialVelocity;
    this.angle = 6;
    this.degree = 0;
    this.countFrame = 0;
    this.countDown = 30;
  }
}

export default Bird;
