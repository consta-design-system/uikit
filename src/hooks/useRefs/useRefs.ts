import { createRef, useMemo } from 'react';

export const useRefs = <T>(length: number, deps: unknown[] = []) =>
  useMemo(() => new Array(length).fill(null).map(() => createRef<T>()), [length, ...deps]);
