import './FieldTextAreaWrapper.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { FieldPropSize } from '../types';

type FieldTextAreaWrapperProps = PropsWithJsxAttributes<
  {
    children?: React.ReactNode;
    size: FieldPropSize;
  },
  'div'
>;

export const cnFieldTextAreaWrapper = cn('FieldTextAreaWrapper');

const resizerGapMap: Record<FieldPropSize, number> = {
  l: 5,
  m: 5,
  s: 4,
  xs: 3,
};

export const FieldTextAreaWrapper = forwardRef<
  HTMLDivElement,
  FieldTextAreaWrapperProps
>(({ className, style, size, ...props }, ref) => {
  return (
    <div
      {...props}
      style={{
        ...style,
        ['--field-textarea-resizer-gap' as string]: resizerGapMap[size],
      }}
      ref={ref}
      className={cnFieldTextAreaWrapper(null, [className])}
    />
  );
});
