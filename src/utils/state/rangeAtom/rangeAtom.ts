import { atom, AtomLike, computed } from '@reatom/core';

export const rangeAtom = <T>(length: AtomLike<number>, initialValue: T) =>
  computed(() => Array.from({ length: length() }, () => atom<T>(initialValue)));
