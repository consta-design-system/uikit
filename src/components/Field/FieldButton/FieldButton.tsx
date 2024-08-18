import './FieldButton.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldButtonProps = PropsWithHTMLAttributesAndRef<
  {
    children: React.ReactNode;
  },
  HTMLButtonElement
>;

export const cnFieldButton = cn('FieldButton');

export const FieldButton = forwardRef<HTMLButtonElement, FieldButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cnFieldButton(null, [className])}
        type="button"
      />
    );
  },
);
