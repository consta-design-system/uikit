import { useMemo } from 'react';

import { getElementSize, useResizeObserved } from '##/hooks/useResizeObserved';

import { ComponentSize } from './types';

export const useComponentSize = (
  ref: React.RefObject<HTMLElement | SVGGraphicsElement>,
  deps: unknown[] = [],
): ComponentSize =>
  useResizeObserved(
    useMemo(
      () => [ref],
      // Если реф начал указывать на другой элемент, нужно обновить подписки
      [ref.current, ...deps],
    ),
    getElementSize,
  )[0];
