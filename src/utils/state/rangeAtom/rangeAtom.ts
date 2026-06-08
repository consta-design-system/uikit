import { atom, AtomLike, computed } from '@reatom/core';

export const rangeAtom = <T>(
  length: AtomLike<number>,
  initialValue: T,
  name: string = 'rangeAtom',
) =>
  computed(
    () =>
      Array.from({ length: length() }, (_, index) =>
        atom<T>(initialValue, `${name}[${index}]`),
      ),
    name,
  );
