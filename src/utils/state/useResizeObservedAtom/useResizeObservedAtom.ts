import { AtomLike } from '@reatom/core';
import { useAction } from '@reatom/react';
import { useEffect, useMemo } from 'react';

import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useSendToAtom } from '##/utils/state/useSendToAtom';

export const useResizeObservedAtom = <
  ELEMENT extends HTMLElement | null,
  RETURN_TYPE,
>(
  elementsAtom: AtomLike<ELEMENT[]>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
) => {
  const mapperAtom = useSendToAtom(mapper);
  const stateAtom = useCreateAtom<(RETURN_TYPE | undefined)[]>([]);

  const update = useAction(() =>
    stateAtom.set(elementsAtom().map(mapperAtom())),
  );

  const resizeObserver = useMemo(() => new ResizeObserver(update), []);

  useEffect(() => {
    const unsubscribe = elementsAtom.subscribe((elements) => {
      update();
      resizeObserver.disconnect();
      for (const el of elements) {
        el && resizeObserver.observe(el);
      }
    });
    return () => {
      unsubscribe();
      resizeObserver.disconnect();
    };
  }, []);

  return stateAtom;
};
