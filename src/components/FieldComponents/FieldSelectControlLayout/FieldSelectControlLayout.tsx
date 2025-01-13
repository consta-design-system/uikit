import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
  getFieldIconSize,
} from '..';
import { cnFieldSelectControlLayout } from './cnFieldSelectControlLayout';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  open?: boolean;
  separator?: boolean;
  onClear?: () => void;
};

export const FieldSelectControlLayout = forwardRef<
  HTMLDivElement,
  FieldButtonProps
>(({ className, size = 'm', onClear, open, separator, ...props }, ref) => {
  return (
    <FieldControlLayout
      {...props}
      size={size}
      ref={ref}
      className={cnFieldSelectControlLayout({ separator }, [className])}
      rightSide={[
        onClear ? <FieldClearButton tabIndex={-1} size={size} /> : undefined,
        separator ? (
          <div className={cnFieldSelectControlLayout('Separator')} />
        ) : undefined,
        <FieldButton tabIndex={-1}>
          <IconSelect
            className={cnFieldSelectControlLayout('DropDownIcon', {
              open,
            })}
            size={getFieldIconSize(size)}
          />
        </FieldButton>,
      ]}
    />
  );
});
