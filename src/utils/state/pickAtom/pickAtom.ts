import { AtomLike, computed } from '@reatom/core';

import { pick, PickReturn } from '##/utils/object';

export const needUpdate = (
  state: Record<string, unknown>,
  newState: Record<string, unknown>,
  keys: (string | number | symbol)[],
): boolean => {
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as string;

    if (newState[key] !== state[key]) {
      return true;
    }
  }
  return false;
};

export const pickAtom = <T extends {}, K extends keyof T>(
  target: AtomLike<T>,
  keys: K[],
) =>
  computed<PickReturn<T, K>>((state) => {
    const newState = pick(target(), keys);
    if (!state) {
      return newState;
    }

    if (needUpdate(state, newState, keys)) {
      return newState;
    }

    return state;
  });
