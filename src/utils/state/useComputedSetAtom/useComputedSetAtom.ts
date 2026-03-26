import { Atom, atom, AtomLike, Computed, computed, effect } from '@reatom/core';

import { useCreateAtom } from '../useCreateAtom';

export const useComputedSetAtom: {
  <Target extends AtomLike>(
    target: Target,
    deps?: Array<any>,
    options?: { subscribe?: boolean },
  ): Target;

  <State>(
    computed: () => State,
    deps?: Array<any>,
    options?: string | { name?: string; subscribe?: boolean },
  ): Computed<State>;

  <State>(
    initState: State,
    deps?: Array<any>,
    options?: string | { name?: string; subscribe?: boolean },
  ): Atom<State>;
} = <T>(init: T) => {
  const computedAtom = useCreateAtom(init);
  const setAtom = atom<T>();

  effect(() => setAtom.set(computedAtom()));

  return setAtom;
};
