import { atom, computed, effect } from '@reatom/core';

export const computedSet = <State>(
  cb: (() => State) | ((state?: State) => State),
  name?: string,
) => {
  const computedAtom = computed(cb, name);
  const setAtom = atom<State>(computedAtom());

  effect(() => setAtom.set(computedAtom()));

  return setAtom;
};
