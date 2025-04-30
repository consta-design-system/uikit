import { atom, AtomMut, CtxSpy } from '@reatom/core';
import { useCtx } from '@reatom/npm-react';
import { useEffect, useMemo } from 'react';

const emptyFn = () => {};
const emptyArray: [] = [];

export const useCreateAtom = <T>(init: T | ((ctx: CtxSpy) => T)) => {
  const ctx = useCtx();
  const targetAtom = useMemo(() => atom(init), emptyArray) as AtomMut<T>;

  useEffect(() => ctx.subscribe(targetAtom, emptyFn), emptyArray);

  return targetAtom;
};
