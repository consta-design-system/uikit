import React from 'react';

import { useBreakpoints } from '##/hooks/useBreakpoints';
import { isEmpty } from '##/utils/object';
import { isNotNil } from '##/utils/type-guards';

import { GridPropGap, GridPropXAlign, GridPropYAlign } from './types';

export const normalizeGap = (gap: GridPropGap | undefined) => {
  if (typeof gap === 'string') {
    return `var(--space-${gap})`;
  }

  return gap;
};

const alignMap = {
  left: 'start',
  top: 'start',
  center: 'center',
  right: 'end',
  bottom: 'end',
} as const;

export const normalizeAlign = (
  align: GridPropXAlign | GridPropYAlign | undefined,
) => (align ? alignMap[align] : undefined);

const calculateBreakpoints = <T extends {}>(
  breakpoints: Record<string, T>,
  activeBreakpoints: Record<string, boolean>,
) => {
  let retuned = {} as T;
  for (const key in activeBreakpoints) {
    if (
      Object.prototype.hasOwnProperty.call(activeBreakpoints, key) &&
      activeBreakpoints[key]
    ) {
      retuned = { ...retuned, ...breakpoints[key] };
    } else {
      break;
    }
  }

  return retuned;
};

export const useGridBreakpoints = <T extends {}>(
  breakpoints: Record<string, T>,
  ref?: React.RefObject<HTMLElement>,
) => {
  const keys = Object.keys(breakpoints);

  const map = Object.fromEntries(
    keys
      .map((item) => {
        return isEmpty(breakpoints[item])
          ? undefined
          : ([item, Number(item)] as const);
      })
      .filter(isNotNil),
  );

  const activeBreakpoints = useBreakpoints({
    map,
    ref,
    isActive: keys.length > 1,
  });

  return calculateBreakpoints(breakpoints, activeBreakpoints);
};
