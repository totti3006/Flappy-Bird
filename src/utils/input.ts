import State from "../components/state";

export default (state: State): void => {
  document.body.addEventListener("keydown", (e: KeyboardEvent) => {
    console.log(e.code);
    if (e.code == "Space") {
      state.spaceDown = true;
    }
    if (e.code == "Enter") {
      state.enterDown = true;
    }
  });
};
