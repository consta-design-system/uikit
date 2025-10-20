import { IconComponent } from '@consta/icons/Icon';
import { IconClear } from '@consta/icons/IconClear';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldPropSize,
  getFieldIconSize,
} from '##/components/FieldComponents';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldClearButtonProps = PropsWithHTMLAttributesAndRef<
  {
    size?: FieldPropSize;
    children?: never;
    icon?: IconComponent;
  },
  HTMLButtonElement
>;

export const cnFieldClearButton = cn('FieldClearButton');

export const FieldClearButton = forwardRef<
  HTMLButtonElement,
  FieldClearButtonProps
>(({ size = 'm', icon: Icon = IconClear, className, ...props }, ref) => {
  return (
    <FieldButton
      {...props}
      className={cnFieldClearButton(null, [className])}
      ref={ref}
    >
      <Icon size={getFieldIconSize(size)} />
    </FieldButton>
  );
});
