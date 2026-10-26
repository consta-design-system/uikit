import { IconComponent } from '@consta/icons/Icon';
import { IconSelect } from '@consta/icons/IconSelect';
import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
  getFieldIconSize,
} from '##/components/FieldComponents';

import { cnSelectControlLayout } from './cnSelectControlLayout';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  openAtom: AtomLike<boolean>;
  focusAtom: AtomLike<boolean>;
  clearButtonAtom: AtomLike<boolean>;
  separator?: boolean;
  onClear: (e: React.SyntheticEvent<Element, Event>) => void;
  onDropdownButton?: (e: React.SyntheticEvent<Element, Event>) => void;
  iconClear?: IconComponent;
};

export const SelectControlLayout = forwardRef<HTMLDivElement, FieldButtonProps>(
  (
    {
      className,
      size = 'm',
      onClear,
      openAtom,
      focusAtom,
      separator,
      onDropdownButton,
      clearButtonAtom,
      iconClear,
      ...props
    },
    ref,
  ) => {
    const [clearButton] = useAtom(clearButtonAtom);
    const open = useAtom(openAtom)[0];

    return (
      <FieldControlLayout
        {...props}
        size={size}
        ref={ref}
        className={cnSelectControlLayout({ separator, clearButton }, [
          className,
        ])}
        focused={useAtom(focusAtom)[0]}
        alignSlots="center"
        rightSide={[
          clearButton ? (
            <FieldClearButton
              className={cnSelectControlLayout('ClearButton')}
              tabIndex={-1}
              size={size}
              onClick={onClear}
              icon={iconClear}
            />
          ) : undefined,
          separator ? (
            <div className={cnSelectControlLayout('Separator')} />
          ) : undefined,
          <FieldButton tabIndex={-1} onClick={onDropdownButton}>
            <IconSelect
              className={cnSelectControlLayout('DropDownIcon', {
                open,
              })}
              size={getFieldIconSize(size)}
            />
          </FieldButton>,
        ]}
      />
    );
  },
);
