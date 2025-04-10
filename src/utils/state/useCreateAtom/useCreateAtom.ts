import { atom, CtxSpy, Fn } from '@reatom/core';
import { useCtx } from '@reatom/npm-react';
import { useEffect, useMemo } from 'react';

// export const useCreateAtom = <T>(init: T | Fn<[CtxSpy], T>) =>
//   useAtom(init, undefined, false)[2];

export const useCreateAtom = <T>(init: T | Fn<[CtxSpy], T>) => {
  const ctx = useCtx();
  const a = useMemo(() => atom(init), []);

  useEffect(() => {
    const unsubscribe = ctx.subscribe(a, () => {});
    return unsubscribe;
  }, []);

  return a;
};
