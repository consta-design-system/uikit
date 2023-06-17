import { useMemo } from 'react';

import { useResizeObserved } from '##/hooks/useResizeObserved';

import { getElementSize } from './getElementSize';
import { ComponentSize } from './types';

export function useComponentSize(
  ref: React.RefObject<HTMLElement | SVGGraphicsElement>,
): ComponentSize {
  const refs = useMemo(
    () => [ref],
    // Если реф начал указывать на другой элемент, нужно обновить подписки
    [ref.current],
  );
  return useResizeObserved(refs, getElementSize)[0];
}
