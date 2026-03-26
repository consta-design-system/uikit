import { LegacyRef, useMemo } from 'react';

import { setRef } from '##/utils/setRef';

export const forkRef =
  <T>(refs: (LegacyRef<T> | undefined)[]): React.RefCallback<T> =>
  (value) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };

export const useForkRef = <T>(refs: (LegacyRef<T> | undefined)[]) =>
  useMemo(() => forkRef(refs), refs);
