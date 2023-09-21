import './GridItem.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { GridItemProps } from '../types';
import { useBreakpoints } from '../useBreakpoints';

export const cnGridItem = cn('GridItem');

export const GridItem = forwardRefWithAs<GridItemProps>((props, ref) => {
  const {
    as = 'div',
    col,
    colStart,
    row,
    rowStart,
    order,
    className,
    children,
    breakpoints,
    ...otherProps
  } = props;

  const Tag = as as string;

  const breakpointsCn = useBreakpoints(cnGridItem, breakpoints);

  return (
    <Tag
      {...otherProps}
      className={cnGridItem(
        {
          col,
          colStart,
          row,
          rowStart,
          order,
        },
        [breakpointsCn, className],
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
