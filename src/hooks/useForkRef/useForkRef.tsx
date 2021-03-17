import { useMemo } from 'react';

import { setRef } from '../../utils/setRef';

type AtributesRef<T> = React.Ref<T> | undefined;
type ResultRef<T> = React.RefCallback<T> | null;

export function useForkRef<T>(refs: AtributesRef<T>[]): ResultRef<T> {
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
