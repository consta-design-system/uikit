import { AtomMut } from '@reatom/framework';
import { useAtom, useCtx } from '@reatom/npm-react';
import { useEffect } from 'react';

import { pick } from '##/utils/object';

export type ObjectAtomValue<T> = {
  [Property in keyof T]: T[Property];
};

export type AtomProp<T> = AtomMut<ObjectAtomValue<T>>;

export const usePropAtom = <
  T extends {},
  K extends keyof T,
  S extends boolean = false,
>(
  target: AtomMut<T>,
  key: K,
  subscribe?: S,
) => {
  // eslint-disable-next-line no-unused-vars
  const [state, _, atom] = useAtom(
    (ctx) => ctx.spy(target)[key],
    [key],
    subscribe,
  );
  return (subscribe ? ([state, atom] as const) : atom) as S extends true
    ? [T[K], AtomMut<T[K]>]
    : AtomMut<T[K]>;
};

export type UseObjectPropsAtomReturn<T, K extends keyof T> = {
  [Property in K]: T[Property];
};

const needUpdate = (
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

export const usePickAtom = <
  T extends {},
  K extends keyof T,
  S extends boolean = false,
>(
  target: AtomMut<T>,
  keys: K[],
  subscribe?: S,
) => {
  const ctx = useCtx();

  // eslint-disable-next-line no-unused-vars
  const [state, _, atom] = useAtom(
    pick(ctx.get(target), keys),
    undefined,
    subscribe,
  );

  useEffect(() => {
    const unsubscribe = ctx.subscribe(target, (newState) => {
      if (needUpdate(ctx.get(atom), newState, keys)) {
        atom(ctx, pick(newState, keys));
      }
    });

    return unsubscribe;
  }, [target]);

  return (subscribe ? [state, atom] : atom) as S extends true
    ? [UseObjectPropsAtomReturn<T, K>, AtomMut<UseObjectPropsAtomReturn<T, K>>]
    : AtomMut<UseObjectPropsAtomReturn<T, K>>;
};
