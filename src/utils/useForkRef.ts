import * as React from 'react';

import { setRef } from './setRef';

type AtributesRef<T> = React.Ref<T> | undefined;
type ResultRef<T> = React.RefCallback<T> | null;

export function useForkRef<T>(refs: AtributesRef<T>[]): ResultRef<T> {
  return React.useMemo(() => {
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
