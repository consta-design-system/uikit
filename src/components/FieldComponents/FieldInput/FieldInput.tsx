import React, { forwardRef } from 'react';

import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { cnFieldInput } from './cnFieldInput';

type FieldInputProps = PropsWithJsxAttributes<
  {
    children?: never;
  },
  'input'
>;

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input {...props} ref={ref} className={cnFieldInput(null, [className])} />
    );
  },
);
