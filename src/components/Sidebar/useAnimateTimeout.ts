import { AtomMut } from '@reatom/core';
import { useAtom } from '@reatom/npm-react';

import { getElementSize } from '##/hooks/useResizeObserved';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useResizeObservedAtom } from '##/utils/state/useResizeObservedAtom';
import { useSendToAtom } from '##/utils/state/useSendToAtom';

const coefficient = 60;

export const useAnimateTimeout = (
  windowElAtom: AtomMut<HTMLDivElement | null>,
  position: 'right' | 'bottom' | 'left' | 'top',
) => {
  const dimensionsAtom = useResizeObservedAtom(
    useCreateAtom((ctx) => [ctx.spy(windowElAtom)]),
    getElementSize,
  );

  const positionAtom = useSendToAtom(position);

  const useAnimateTimeoutAtom = useCreateAtom((ctx) => {
    const dimensions = ctx.spy(dimensionsAtom)[0] || { width: 0, height: 0 };
    const position = ctx.spy(positionAtom);

    const size =
      position === 'right' || position === 'left'
        ? dimensions.width
        : dimensions.height;

    const timeout = Math.floor(size / 100) * coefficient;

    return timeout < 150 ? 150 : Math.min(timeout, 400);
  });

  return useAtom(useAnimateTimeoutAtom)[0];
};
