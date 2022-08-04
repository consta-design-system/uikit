import './GridItem.css';

import { classnames } from '@bem-react/classnames';
import React from 'react';

import { cn } from '../../../utils/bem';
import { forwardRefWithAs } from '../../../utils/types/PropsWithAsAttributes';
import { useBreakpoints } from '../useBreakpoints';

type Breakpoint = {
  col?: number | string;
  colStart?: number | string;
  row?: number | string;
  rowStart?: number | string;
  order?: number | string;
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
