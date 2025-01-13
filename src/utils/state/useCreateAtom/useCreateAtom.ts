import { CtxSpy, Fn } from '@reatom/core';
import { useAtom } from '@reatom/npm-react';

export const useCreateAtom = <T>(init: T | Fn<[CtxSpy], T>) =>
  useAtom(init, undefined, false)[2];
