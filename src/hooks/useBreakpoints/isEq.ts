import { Returned } from './types';

export const isEq = <POINTS extends string>(
  state: Returned<POINTS>,
  newState: Returned<POINTS>,
) => {
  let eq = true;
  for (const key in newState) {
    if (state[key] !== newState[key]) {
      eq = false;
      return eq;
    }
  }
  return eq;
};
