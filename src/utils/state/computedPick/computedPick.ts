import { AtomLike, Computed, computed } from '@reatom/core';

export type ComputedPickReturn<T, K extends keyof T> = {
  [Property in K]-?: Computed<T[Property]>;
};

export const computedPick = <T extends {}, K extends keyof T>(
  target: AtomLike<T>,
  keys: K[],
): ComputedPickReturn<T, K> => {
  const obj = {} as ComputedPickReturn<T, K>;

  keys.forEach((key) => {
    obj[key] = computed(() => target()[key]);
  });

  return obj;
};
