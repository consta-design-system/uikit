import { useAtom } from '@reatom/react';
import { RefObject, useEffect } from 'react';

export const useSendToAtom = <T>(value: T) =>
  useAtom<T>(() => value, [value], { subscribe: false })[2];

export const useSendRefToAtom = <E>(ref: RefObject<E> | undefined) => {
  const atom = useAtom<E | null>(ref?.current || null, [], {
    subscribe: false,
  })[2];
  useEffect(() => {
    atom.set(ref?.current || null);
  }, [ref?.current]);
  return atom;
};
