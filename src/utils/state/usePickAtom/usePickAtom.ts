import { Atom, AtomLike, Computed, peek } from '@reatom/core';
import { useAtom } from '@reatom/react';
import { useEffect } from 'react';

import { pick } from '##/utils/object';

import { useCreateAtom } from '../useCreateAtom';

export type ObjectAtomValue<T> = {
  [Property in keyof T]: T[Property];
};

export type AtomProp<T> = Atom<ObjectAtomValue<T>>;

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

export const usePickAtom = <T extends {}, K extends keyof T>(
  target: AtomLike<T>,
  keys: K[],
) => {
  const atom = useCreateAtom({});

  useEffect(() => {
    const unsubscribe = target.subscribe((newState) => {
      if (needUpdate(peek(atom), newState, keys)) {
        atom.set(pick(newState, keys));
      }
    });

    return unsubscribe;
  }, []);

  return atom as Computed<UseObjectPropsAtomReturn<T, K>>;
};

export const usePropAtom = <T extends {}, K extends keyof T>(
  target: AtomLike<T>,
  key: K,
) => {
  return useAtom(() => target()[key], [], {
    subscribe: false,
  })[2];
};

export type UseObjectPropsAtomReturn<T, K extends keyof T> = {
  [Property in K]: T[Property];
};
