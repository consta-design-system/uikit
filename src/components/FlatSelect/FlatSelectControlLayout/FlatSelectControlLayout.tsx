import { IconComponent } from '@consta/icons/Icon';
import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '##/components/FieldComponents';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  focusAtom: AtomMut<boolean>;
  clearButtonAtom: AtomMut<boolean>;
  separator?: boolean;
  onClear: (e: React.SyntheticEvent<Element, Event>) => void;
  onDropdownButton?: (e: React.SyntheticEvent<Element, Event>) => void;
  iconClear?: IconComponent;
  leftSide?: React.ReactNode | React.ReactNode[];
  valueAtom: AtomMut<string>;
};

export const FlatSelectControlLayout = forwardRef<
  HTMLDivElement,
  FieldButtonProps
>(
  (
    {
      className,
      size = 's',
      onClear,
      focusAtom,
      separator,
      onDropdownButton,
      clearButtonAtom,
      iconClear,
      view,
      valueAtom,
      ...props
    },
    ref,
  ) => {
    const [clearButton] = useAtom(
      (ctx) => ctx.spy(clearButtonAtom) && !!ctx.spy(valueAtom),
    );

    return (
      <FieldControlLayout
        {...props}
        size={size}
        ref={ref}
        className={className}
        focused={useAtom(focusAtom)[0]}
        alignSlots="center"
        view={view}
        rightSide={[
          clearButton ? (
            <FieldClearButton
              tabIndex={-1}
              size={size}
              onClick={onClear}
              icon={iconClear}
            />
          ) : undefined,
        ]}
      />
    );
  },
);
