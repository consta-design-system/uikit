import React, { forwardRef } from 'react';

import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { cnFieldButtonStyleReset } from '../FieldButtonStyleReset';
import { cnFieldButton } from './cnFieldButton';

type FieldButtonProps = PropsWithHTMLAttributesAndRef<
  {
    children: React.ReactNode;
  },
  HTMLButtonElement
>;

export const FieldButton = forwardRef<HTMLButtonElement, FieldButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cnFieldButton(null, [
          cnFieldButtonStyleReset(),
          cnMixHitSlop({ mode: 'reverseMargin' }),
          className,
        ])}
        type="button"
      />
    );
  },
);
