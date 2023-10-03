import './GridItem.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { useGridBreakpoints } from '../helpers';
import { GridItemProps } from '../types';

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
    style,
    breakpointsForRef,
    ...otherProps
  } = props;

  const mods = useGridBreakpoints(
    {
      0: { col, colStart, row, rowStart, order },
      ...breakpoints,
    },
    breakpointsForRef,
  );

  const Tag = as as string;

  return (
    <Tag
      {...otherProps}
      className={cnGridItem(mods, [className])}
      ref={ref}
      style={{
        ...style,
        ['--grid-item-col-end' as string]: mods.col,
        ['--grid-item-col-start' as string]: mods.colStart
          ? `${mods.colStart} / span`
          : undefined,
        ['--grid-item-row-end' as string]: mods.row,
        ['--grid-item-row-start' as string]: rowStart
          ? `${mods.rowStart} / span`
          : undefined,
        ['--gird-item-order' as string]: mods.order,
      }}
    >
      {children}
    </Tag>
  );
});
