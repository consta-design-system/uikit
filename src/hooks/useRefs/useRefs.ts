import { createRef, useMemo } from 'react';

export const useRefs = <ELEMENT extends HTMLElement>(length: number, deps: unknown[] = []) =>
  useMemo(() => new Array(length).fill(null).map(() => createRef<ELEMENT>()), [length, ...deps]);
