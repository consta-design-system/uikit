import { Atom, AtomLike, Computed } from '@reatom/core';
import { useAtom } from '@reatom/react';

export const useCreateAtom: {
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
} = <T>(init: T) => useAtom<T>(init, undefined, { subscribe: false })[2];
