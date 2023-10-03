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
export type GridPropGap = typeof gridPropGap[number];

export const breakpointSizes = ['xs', 's', 'm', 'l', 'xl', '2xl'] as const;
export type BreakpointSizes = typeof breakpointSizes[number];

type GridBreakpoint = {
  cols?: number;
  gap?: GridPropGap;
  colGap?: GridPropGap;
  rowGap?: GridPropGap;
  xAlign?: GridPropXAlign;
  yAlign?: GridPropYAlign;
};

export type GridPropBreakpoints = Record<number, GridBreakpoint>;

export type GridProps = GridBreakpoint & {
  breakpoints?: GridPropBreakpoints;
  breakpointsForRef?: React.RefObject<HTMLElement>;
};

type GridItemBreakpoint = {
  col?: number;
  colStart?: number;
  row?: number;
  rowStart?: number;
  order?: 0 | 1 | -1;
};

export type GridItemPropBreakpoints = Record<number, GridItemBreakpoint>;

export type GridItemProps = GridItemBreakpoint & {
  breakpoints?: GridItemPropBreakpoints;
  breakpointsForRef?: React.RefObject<HTMLElement>;
};
