import { LegacyRef, MutableRefObject } from 'react';

export const setRef = <T>(ref: LegacyRef<T> | undefined, value: T) => {
  if (ref && typeof ref === 'function') {
    ref(value);
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    (ref as MutableRefObject<T>).current = value;
  }
};

export const setRefs = <T>(refs: (LegacyRef<T> | undefined)[], value: T) => {
  for (const ref of refs) {
    setRef(ref, value);
  }
};
