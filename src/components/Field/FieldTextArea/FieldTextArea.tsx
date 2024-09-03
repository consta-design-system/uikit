import './FieldTextArea.css';

import React, { forwardRef } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { FieldPropSize } from '../types';

type FieldTextAreaProps = PropsWithJsxAttributes<
  {
    children?: never;
    resize?: 'both' | 'horizontal' | 'vertical';
    size: FieldPropSize;
  },
  'textarea'
>;

export const cnFieldTextArea = cn('FieldTextArea');

const resizerGapMap: Record<FieldPropSize, number> = {
  l: 5,
  m: 5,
  s: 4,
  xs: 3,
};

export const FieldTextArea = forwardRef<
  HTMLTextAreaElement,
  FieldTextAreaProps
>(({ className, resize = 'both', style, size, ...props }, ref) => {
  return (
    <textarea
      {...props}
      style={{
        ...style,
        ['--field-textarea-resize' as string]: resize,
      }}
      ref={ref}
      className={cnFieldTextArea({ resizer: !!resize }, [
        // cnMixScrollBar({ size: 'xs' }),
        className,
      ])}
    />
  );
});
