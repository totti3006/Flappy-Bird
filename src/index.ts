import * as setting from "./settings";
import * as util from "./utils/utils";
import Game from "./components/game";
import State from "./components/state";
import input from "./utils/input";

let rAF_ID: number;
let lastTime: number = window.performance.now();

const state: State = {
  width: setting.width,
  height: setting.height,
  spaceDown: false,
  enterDown: false,
  screen: {
    mainSreen: true,
    inGame: false,
    endGame: false,
  },
  score: {
    current: 0,
    best: 0,
  },

  setCurrentScore(score: number): void {
    this.score.current = score;
  },
  setBestScore(best: number): void {
    this.score.best = best;
  },
  getWidth(): number {
    return this.width;
  },
  getHeight(): number {
    return this.height;
  },
  getCurrentScore(): number {
    return this.score.current;
  },
  getBestScore(): number {
    return this.score.best;
  },
  toggleSpaceState(): void {
    this.spaceDown = !this.spaceDown;
  },
  changeScreen(status: string): void {
    this.screen.mainSreen = false;
    this.screen.inGame = false;
    this.screen.endGame = false;

    type ObjectKey = keyof typeof this.screen;
    const key = status as ObjectKey;
    this.screen[key] = true;
  },
};

let canvas: HTMLCanvasElement = document.getElementById(
  "maingame"
) as HTMLCanvasElement;
canvas.setAttribute("width", setting.width as unknown as string);
canvas.setAttribute("height", setting.height as unknown as string);

const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

let birdgame: Game = new Game(ctx, state);

let loop = (): void => {
  const time: number = window.performance.now();
  const delta: number = time - lastTime;

  input(state);
  birdgame.render();
  birdgame.update();

  lastTime = time;
  util.sleep(time + setting.MS_PER_FRAME - window.performance.now()); // adjust FPS

  rAF_ID = requestAnimationFrame(loop);
};

rAF_ID = requestAnimationFrame(loop);
