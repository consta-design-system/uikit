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
  },
  HTMLButtonElement
>;

export const FieldClearButton = forwardRef<
  HTMLButtonElement,
  FieldClearButtonProps
>(({ size = 'm', ...props }, ref) => {
  return (
    <FieldButton {...props} ref={ref}>
      <IconClear size={getFieldIconSize(size)} />
    </FieldButton>
  );
});
