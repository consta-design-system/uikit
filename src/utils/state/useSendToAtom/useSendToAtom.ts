import { useAtom } from '@reatom/react';

export const useSendToAtom = <T>(value: T, name?: string) =>
  useAtom<T>(() => value, [value], { subscribe: false, name })[2];
