import { IconComponent } from '@consta/icons/Icon';
import { AtomLike } from '@reatom/core';
import React from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '##/components/FieldComponents';
import { factoryComponent } from '##/utils/state';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  focusAtom: AtomLike<boolean>;
  clearButtonAtom: AtomLike<boolean>;
  separator?: boolean;
  onClear: (e: React.SyntheticEvent<Element, Event>) => void;
  onDropdownButton?: (e: React.SyntheticEvent<Element, Event>) => void;
  iconClear?: IconComponent;
  leftSide?: React.ReactNode | React.ReactNode[];
};

export const FlatSelectControlLayout = factoryComponent<
  HTMLDivElement,
  FieldButtonProps
>(
  ({ ref }) =>
    ({
      className,
      size = 's',
      onClear,
      separator,
      onDropdownButton,
      iconClear,
      focusAtom,
      clearButtonAtom,
      view,
      ...props
    }) => (
      <FieldControlLayout
        {...props}
        size={size}
        ref={ref}
        className={className}
        focused={focusAtom()}
        alignSlots="center"
        view={view}
        rightSide={[
          clearButtonAtom() ? (
            <FieldClearButton
              tabIndex={-1}
              size={size}
              onClick={onClear}
              icon={iconClear}
            />
          ) : undefined,
        ]}
      />
    ),
);
