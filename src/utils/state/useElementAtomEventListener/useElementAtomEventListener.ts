import { AtomMut } from '@reatom/framework';
import { useUpdate } from '@reatom/npm-react';
import { useEffect, useRef } from 'react';

import { setRef } from '##/utils/setRef';

export const useElementAtomEventListener = <T extends HTMLElement>(
  elementAtom: AtomMut<T | null>,
  type: keyof DocumentEventMap,
  listener: EventListener,
) => {
  const currentRef = useRef<T | null>(null);
  useUpdate(
    (ctx, element, listener) => {
      currentRef.current?.removeEventListener(type, listener);
      element?.addEventListener(type, listener);

      setRef(currentRef, element || null);
    },
    [elementAtom, listener],
  );
  useEffect(() => {
    return () => {
      currentRef.current?.removeEventListener(type, listener);
    };
  }, [type, listener]);
};
