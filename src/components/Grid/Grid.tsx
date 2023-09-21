import './Grid.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { GridProps } from './types';
import { useBreakpoints } from './useBreakpoints';

export const cnGrid = cn('Grid');

export const Grid = forwardRefWithAs<GridProps>((props, ref) => {
  const {
    as = 'div',
    cols,
    xAlign,
    yAlign,
    gap,
    colGap,
    rowGap,
    className,
    children,
    breakpoints,
    ...otherProps
  } = props;

  const Tag = as as string;

  const breakpointsCn = useBreakpoints(cnGrid, breakpoints);

  return (
    <Tag
      {...otherProps}
      className={cnGrid(
        {
          cols,
          gap,
          colGap,
          rowGap,
          xAlign,
          yAlign,
        },
        [breakpointsCn, className],
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
