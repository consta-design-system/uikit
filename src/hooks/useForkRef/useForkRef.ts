import { AtomLike } from '@reatom/core';
import { Ref, RefCallback, useMemo } from 'react';

import { setRef } from '##/utils/setRef';

export const forkRef =
  <T>(refs: (Ref<T> | AtomLike<T> | undefined)[]): React.RefCallback<T> =>
  (value) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };

export const useForkRef = <T>(refs: (Ref<T> | undefined)[]): RefCallback<T> =>
  useMemo(() => forkRef(refs), refs);
