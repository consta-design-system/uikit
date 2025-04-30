import { IconComponent } from '@consta/icons/Icon';
import { IconClear } from '@consta/icons/IconClear';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldPropSize,
  getFieldIconSize,
} from '##/components/FieldComponents';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldClearButtonProps = PropsWithHTMLAttributesAndRef<
  {
    size?: FieldPropSize;
    children?: never;
    icon?: IconComponent;
  },
  HTMLButtonElement
>;

export const FieldClearButton = forwardRef<
  HTMLButtonElement,
  FieldClearButtonProps
>(({ size = 'm', icon: Icon = IconClear, ...props }, ref) => {
  return (
    <FieldButton {...props} ref={ref}>
      <Icon size={getFieldIconSize(size)} />
    </FieldButton>
  );
});
