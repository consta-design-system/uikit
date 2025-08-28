import { IconComponent } from '@consta/icons/Icon';
import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import {
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '@consta/uikit/FieldComponents';
import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  openAtom: AtomMut<boolean>;
  focusAtom: AtomMut<boolean>;
  clearButtonAtom: AtomMut<boolean>;
  separator?: boolean;
  onClear: (e: React.SyntheticEvent<Element, Event>) => void;
  onDropdownButton?: (e: React.SyntheticEvent<Element, Event>) => void;
  iconClear?: IconComponent;
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
      openAtom,
      focusAtom,
      separator,
      onDropdownButton,
      clearButtonAtom,
      iconClear,
      view,
      ...props
    },
    ref,
  ) => {
    const [clearButton] = useAtom(clearButtonAtom);

    return (
      <FieldControlLayout
        {...props}
        size={size}
        ref={ref}
        className={className}
        focused={useAtom(focusAtom)[0]}
        alignSlots="center"
        leftSide={<IconSearchStroked size="s" />}
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
