import { AtomMut } from '@reatom/framework';
import { useAction, useUpdate } from '@reatom/npm-react';
import { useEffect, useMemo } from 'react';

import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useSendToAtom } from '##/utils/state/useSendToAtom';

export const useResizeObservedAtom = <
  ELEMENT extends HTMLElement | null,
  RETURN_TYPE,
>(
  elementsAtom: AtomMut<ELEMENT[]>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
) => {
  const mapperAtom = useSendToAtom([mapper]);
  const stateAtom = useCreateAtom<(RETURN_TYPE | undefined)[]>([]);

  const update = useAction((ctx) =>
    stateAtom(
      ctx,
      ctx.get(elementsAtom).map((el) => ctx.get(mapperAtom)[0](el)),
    ),
  );

  const resizeObserver = useMemo(() => new ResizeObserver(update), []);

  useUpdate(
    (ctx, elements) => {
      update();
      resizeObserver.disconnect();
      for (const el of elements) {
        el && resizeObserver.observe(el);
      }
    },
    [elementsAtom],
  );

  useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return stateAtom;
};
