import { Returned } from './types';

export const isEq = <POINTS extends string>(
  state: Returned<POINTS>,
  newState: Returned<POINTS>,
) => {
  for (const key in newState) {
    if (state[key] !== newState[key]) {
      return false;
    }
  }
  return true;
};
