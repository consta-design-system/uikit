import { Action, action, AtomLike } from '@reatom/core';

export const actionsPick = <T extends {}, K extends keyof T>(
  target: AtomLike<T>,
  keys: K[],
) => {
  const obj = {} as Record<K, Action>;

  keys.forEach((key) => {
    obj[key] = action((...rest) => {
      const fn = target()[key];
      if (typeof fn === 'function') {
        return fn(...rest);
      }
    });
  });

  return obj as {
    [Property in K]-?: T[Property];
  };
};
