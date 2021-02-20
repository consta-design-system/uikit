import './Grid.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const gridPropCols = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const;
export type GridPropCols = typeof gridPropCols[number];

export const gridPropXAlign = ['left', 'center', 'right'] as const;
export type GridPropXAlign = typeof gridPropXAlign[number];

export const gridPropYAlign = ['top', 'center', 'bottom'] as const;
export type GridPropYAlign = typeof gridPropYAlign[number];

export const gridPropGap = ['0', '33', '50', '66', '100'] as const;
export type GridPropGap = typeof gridPropGap[number];

export const gridBreakpointProps = {
  cols: gridPropCols,
  xAlign: gridPropXAlign,
  yAlign: gridPropYAlign,
  gap: gridPropGap,
};

//  Идея того, как надо прокидывать брейкпоинты в модификаторы
// export type GridBreakpointProps = (breakpoint) => {
//   `${breakpoint}:cols`: GridPropCols,
//   `${breakpoint}:xAlign`: GridPropXAlign,
//   `${breakpoint}:yAlign`: GridPropYAlign,
//   `${breakpoint}:gap`: GridPropGap,
// }

type Props = {
  cols?: GridPropCols;
  xAlign?: GridPropXAlign;
  yAlign?: GridPropYAlign;
  gap?: GridPropGap;
  // xs?: GridBreakpointProps('xs');
  // s?: GridBreakpointProps('s');
  // m?: GridBreakpointProps('m');
  // l?: GridBreakpointProps('l');
  // xl?: GridBreakpointProps('xl');
  // 2xl?: GridBreakpointProps('xl');
};

export const cnGrid = cn('Grid');

export const Grid = forwardRefWithAs<Props>((props, ref) => {
  const {
    as = 'div',
    cols,
    xAlign,
    yAlign,
    gap,
    // xs,
    // s,
    // m,
    // l,
    // xl,
    // 2xl,
    className,
    children,
    ...otherProps
  } = props;

  const Tag = as as string;

  return (
    <Tag
      {...otherProps}
      className={cnGrid(
        {
          as,
          cols,
          xAlign,
          yAlign,
          gap,
          // xs,
          // s,
          // m,
          // l,
          // xl,
          // 2xl,
        },
        [className],
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
});

/* 
<Grid cols='12' gap='2xl' className='myClass' />

<Grid cols='4' gap='half' m={ cols: '8', gap='full' } xl={ cols: '12' } className='myClass' />
<Grid cols='4' gap='half' 'm:cols': '8' 'm:gap'='full' 'xl:cols': '12' className='myClass' />

// Вот это вариант ориентир 
<Grid className='myClass' cols='4' gap='xl' mediaQuery={
  xs: {
    gap: 'm'
    cols: '12'
  },
  m: {
    gap: 'm' // 'Grid_m:gap_m'
    cols: '12'
  },
  123: {
    gap: 'm'
    cols: '12'
  }
} />

<Grid 
  cols={
    x: 12,
    m: 14,
  }
  gap={
    x: '2xs',
    m: 'm',
  }  
  className='myClass' 
/>
*/
