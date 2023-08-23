import { useMemo } from 'react';

import { setRef } from '##/utils/setRef';

export const forkRef = <T>(
  refs: (React.Ref<T> | undefined)[],
): React.RefCallback<T> | null => {
  if (!refs.length) {
    return null;
  }
  return (refValue) => {
    for (const ref of refs) {
      setRef(ref as React.MutableRefObject<T>, refValue);
    }
  };
};

export const useForkRef = <T>(refs: (React.Ref<T> | undefined)[]) =>
  useMemo(() => forkRef(refs), [refs]);
