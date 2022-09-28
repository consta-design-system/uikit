import './Grid.css';

import { classnames } from '@bem-react/classnames';
import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { useBreakpoints } from './useBreakpoints';

export * from './GridItem/GridItem';

export const gridPropXAlign = ['left', 'center', 'right'] as const;
export type GridPropXAlign = typeof gridPropXAlign[number];

export const gridPropYAlign = ['top', 'center', 'bottom'] as const;
export type GridPropYAlign = typeof gridPropYAlign[number];

export const gridPropGap = [
  0,
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const;
export type GridPropGap = typeof gridPropGap[number] | '0';

export type GridPropColGap = GridPropGap;
export type GridPropRowGap = GridPropGap;

export const breakpointSizes = ['xs', 's', 'm', 'l', 'xl', '2xl'] as const;
export type BreakpointSizes = typeof breakpointSizes[number];

type Breakpoint = {
  cols?: number | string;
  gap?: GridPropGap;
  colGap?: GridPropColGap;
  rowGap?: GridPropRowGap;
  xAlign?: GridPropXAlign;
  yAlign?: GridPropYAlign;
};

type BreakpointsProps = {
  'xs'?: Breakpoint;
  's'?: Breakpoint;
  'm'?: Breakpoint;
  'l'?: Breakpoint;
  'xl'?: Breakpoint;
  '2xl'?: Breakpoint;
};

export type GridProps = Breakpoint & {
  breakpoints?: BreakpointsProps;
};

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
      className={classnames(
        cnGrid({
          cols,
          gap,
          colGap,
          rowGap,
          xAlign,
          yAlign,
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
