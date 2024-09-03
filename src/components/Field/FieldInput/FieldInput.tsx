import './FieldInput.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

type FieldInputProps = PropsWithJsxAttributes<
  {
    children?: never;
  },
  'input'
>;

export const cnFieldInput = cn('FieldInput');

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input {...props} ref={ref} className={cnFieldInput(null, [className])} />
    );
  },
);
