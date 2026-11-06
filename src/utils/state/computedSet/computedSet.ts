import { atom, computed, effect } from '@reatom/core';

import { named } from '##/utils/state/generateAtomName';

export const computedSet = <State>(
  cb: (() => State) | ((state?: State) => State),
  name?: string,
) => {
  const n = named(name, 'computedSet');

  const computedAtom = computed(cb, n('computedAtom'));
  const setAtom = atom<State>(computedAtom(), n('setAtom'));
  effect(() => setAtom.set(computedAtom()), n('effect'));

  return setAtom;
};
