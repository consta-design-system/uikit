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

type GridBreakpoint = {
  cols?: number | string;
  gap?: GridPropGap;
  colGap?: GridPropColGap;
  rowGap?: GridPropRowGap;
  xAlign?: GridPropXAlign;
  yAlign?: GridPropYAlign;
};

type GridPropBreakpoints = {
  'xs'?: GridBreakpoint;
  's'?: GridBreakpoint;
  'm'?: GridBreakpoint;
  'l'?: GridBreakpoint;
  'xl'?: GridBreakpoint;
  '2xl'?: GridBreakpoint;
};

export type GridProps = GridBreakpoint & {
  breakpoints?: GridPropBreakpoints;
};

type GridItemBreakpoint = {
  col?: number | string;
  colStart?: number | string;
  row?: number | string;
  rowStart?: number | string;
  order?: number | string;
};

type GridItemPropBreakpoints = {
  'xs'?: GridItemBreakpoint;
  's'?: GridItemBreakpoint;
  'm'?: GridItemBreakpoint;
  'l'?: GridItemBreakpoint;
  'xl'?: GridItemBreakpoint;
  '2xl'?: GridItemBreakpoint;
};

export type GridItemProps = GridItemBreakpoint & {
  breakpoints?: GridItemPropBreakpoints;
};
