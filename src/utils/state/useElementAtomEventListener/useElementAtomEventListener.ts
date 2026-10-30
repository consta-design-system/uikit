import { AtomLike } from '@reatom/core';
import { useEffect, useRef } from 'react';

import { setRef } from '##/utils/setRef';

export const useElementAtomEventListener = <T extends HTMLElement>(
  elementAtom: AtomLike<T | null>,
  type: keyof DocumentEventMap,
  listener: EventListener,
) => {
  const currentRef = useRef<T | null>(null);

  useEffect(() => {
    const unsubscribe = elementAtom.subscribe((element) => {
      // console.log(element, type, listener);
      currentRef.current?.removeEventListener(type, listener);
      element?.addEventListener(type, listener);

      setRef(currentRef, element);
    });

    return () => {
      unsubscribe();
      currentRef.current?.removeEventListener(type, listener);
    };
  }, [type, listener, elementAtom]);
};
