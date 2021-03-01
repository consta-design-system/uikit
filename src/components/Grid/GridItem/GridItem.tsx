import './GridItem.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { cn } from '../../../utils/bem';
import { forwardRefWithAs } from '../../../utils/types/PropsWithAsAttributes';
import { useBreakpoints } from '../useBreakpoints';

export const gridItemPropCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type GridItemPropCols =
  | typeof gridItemPropCols[number]
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type GridItemPropColStart = GridItemPropCols;

export const gridItemPropRows = [1, 2, 3, 4] as const;
export type GridItemPropRows = typeof gridItemPropCols[number] | '1' | '2' | '3' | '4';

export type GridItemPropRowStart = GridItemPropRows;

export const gridItemPropOrder = [-1, 0, 1] as const;
export type GridItemPropOrder = typeof gridItemPropOrder[number] | '-1' | '0' | '1';

type Breakpoint = {
  col?: GridItemPropCols;
  colStart?: GridItemPropColStart;
  row?: GridItemPropRows;
  rowStart?: GridItemPropRowStart;
  order?: GridItemPropOrder;
};

type BreakpointsProps = {
  'xs'?: Breakpoint;
  's'?: Breakpoint;
  'm'?: Breakpoint;
  'l'?: Breakpoint;
  'xl'?: Breakpoint;
  '2xl'?: Breakpoint;
};

export type GridItemProps = Breakpoint & {
  breakpoints?: BreakpointsProps;
};

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
      className={classnames(
        cnGridItem({
          col,
          colStart,
          row,
          rowStart,
          order,
        }),
        breakpointsCn,
        className,
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
});
