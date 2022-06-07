import Game from "./game";

interface State {
  width: number;
  height: number;
  spaceDown: boolean;
  enterDown: boolean;
  screen: {
    mainSreen: boolean;
    inGame: boolean;
    endGame: boolean;
  };
  score: {
    current: number;
    best: number;
  };

  setCurrentScore(score: number): void;
  setBestScore(best: number): void;

  getWidth(): number;
  getHeight(): number;
  getCurrentScore(): number;
  getBestScore(): number;

  toggleSpaceState(): void;
  changeScreen(status: string): void;
}

export default State;
