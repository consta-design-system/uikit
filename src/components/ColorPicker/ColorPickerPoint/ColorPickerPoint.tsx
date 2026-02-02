import './ColorPickerPoint.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

// import { formatClassName } from '../utils/format';

export type ColorPickerPointProps = PropsWithHTMLAttributesAndRef<
  {
    color: string;
  },
  HTMLDivElement
>;

export const cnColorPickerPoint = cn('ColorPickerPoint');

export const ColorPickerPoint = forwardRef<
  HTMLDivElement,
  ColorPickerPointProps
>(({ className, color, ...otherProps }, ref) => {
  return (
    <div
      {...otherProps}
      className={cnColorPickerPoint(null, [className])}
      ref={ref}
    >
      <div
        className={cnColorPickerPoint('Fill')}
        style={{ backgroundColor: color }}
      />
    </div>
  );
});
