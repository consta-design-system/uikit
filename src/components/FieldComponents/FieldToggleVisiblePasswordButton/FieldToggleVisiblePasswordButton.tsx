import { AnimateIconSwitcher } from '@consta/icons/AnimateIconSwitcher';
import { IconEye } from '@consta/icons/IconEye';
import { IconEyeClose } from '@consta/icons/IconEyeClose';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldPropSize,
  getFieldIconSize,
} from '##/components/FieldComponents';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldToggleVisiblePasswordButtonProps = PropsWithHTMLAttributesAndRef<
  {
    size?: FieldPropSize;
    active: boolean;
    children?: never;
  },
  HTMLButtonElement
>;

export const FieldToggleVisiblePasswordButton = forwardRef<
  HTMLButtonElement,
  FieldToggleVisiblePasswordButtonProps
>(({ size = 'm', active, ...props }, ref) => {
  return (
    <FieldButton {...props} ref={ref}>
      <AnimateIconSwitcher
        size={getFieldIconSize(size)}
        startIcon={IconEye}
        endIcon={IconEyeClose}
        active={active}
        transition={125}
      />
    </FieldButton>
  );
});
