import './Grid.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { normalizeAlign, normalizeGap, useGridBreakpoints } from './helpers';
import { GridProps } from './types';

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
    style,
    breakpointsForRef,
    ...otherProps
  } = props;

  const mods = useGridBreakpoints(
    {
      0: { cols, xAlign, yAlign, gap, colGap, rowGap },
      ...breakpoints,
    },
    breakpointsForRef,
  );

  const Tag = as as string;

  return (
    <Tag
      {...otherProps}
      className={cnGrid(mods, [className])}
      style={{
        ...style,
        ['--grid-cols' as string]: mods.cols,
        ['--grid-col-gap' as string]: normalizeGap(mods.colGap || mods.gap),
        ['--grid-row-gap' as string]: normalizeGap(mods.rowGap || mods.gap),
        ['--grid-x-align' as string]: normalizeAlign(mods.xAlign),
        ['--grid-y-align' as string]: normalizeAlign(mods.yAlign),
      }}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
