import { Ref } from 'react';

export const setRef = <T>(
  ref: Ref<T> | undefined | null | ((instance: T) => void),
  value: T,
) => {
  if (ref && typeof ref === 'function') {
    ref(value);
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    ref.current = value;
  }
};

export const setRefs = <T>(
  refs: (Ref<T> | undefined | null | ((instance: T) => void))[],
  value: T,
) => {
  for (const ref of refs) {
    setRef(ref, value);
  }
};
