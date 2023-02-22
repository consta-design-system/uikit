import { useMemo } from 'react';

import { setRef } from '##/utils/setRef';

export function useForkRef<T>(
  refs: (React.Ref<T> | undefined)[],
): React.RefCallback<T> | null {
  return useMemo(() => {
    if (refs.length < 1) {
      return null;
    }
    return (refValue) => {
      for (const ref of refs) {
        setRef(ref as React.MutableRefObject<T>, refValue);
      }
    };
  }, [refs]);
}
