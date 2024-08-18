import './FieldClearButton.css';

import { IconClear } from '@consta/icons/IconClear';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldPropSize,
  getFieldIconSize,
} from '##/components/Field';
import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldClearButtonProps = PropsWithHTMLAttributesAndRef<
  {
    size: FieldPropSize;
    children: React.ReactNode;
  },
  HTMLButtonElement
>;

export const cnFieldClearButton = cn('FieldClearButton');

export const FieldClearButton = forwardRef<
  HTMLButtonElement,
  FieldClearButtonProps
>(({ className, size, ...props }, ref) => {
  return (
    <FieldButton
      {...props}
      ref={ref}
      className={cnFieldClearButton(null, [
        cnMixHitSlop({ mode: 'reverseMargin' }),
        className,
      ])}
    >
      <IconClear size={getFieldIconSize(size)} />
    </FieldButton>
  );
});
