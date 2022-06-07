export const sleep = (delay: number): void => {
  if (delay <= 0) return;
  let start: number = window.performance.now();
  while (window.performance.now() < start + delay);
};
