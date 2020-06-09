import * as React from 'react';

import { setRef } from './setRef';

type Ref<T> = React.Ref<T> | undefined;

export function useForkRef<T>(refs: Ref<T>[]): React.Ref<T> {
  return React.useMemo(() => {
    if (refs.length < 1) {
      return null;
    }
    return (refValue) => {
      for (const ref of refs) {
        setRef(ref, refValue);
      }
    };
  }, [refs]);
}
