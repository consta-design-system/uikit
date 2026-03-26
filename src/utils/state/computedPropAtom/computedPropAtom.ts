import { Computed, computed } from '@reatom/core';

export const computedPropAtom = <T extends {}, K extends keyof T>(
  propsAtom: Computed<T>,
  key: K,
) => {
  return computed(() => propsAtom()[key]);
};
