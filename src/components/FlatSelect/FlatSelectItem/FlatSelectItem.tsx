import './FlatSelectItem.css';

import React, { forwardRef } from 'react';

import { Checkbox, CheckboxPropSize } from '##/components/Checkbox';
import { FieldPropSize } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { cnCanary as cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type FlatSelectItemProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    multiple?: boolean;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    disabled: boolean | undefined;
  },
  HTMLDivElement
>;

export const sizeCheckboxMap: Record<FieldPropSize, CheckboxPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

export const cnFlatSelectItem = cn('FlatSelectItem');

export const FlatSelectItem: React.FC<FlatSelectItemProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      label,
      active,
      hovered,
      multiple,
      size,
      indent,
      disabled,
      onClick,
      ...otherProps
    } = props;

    return (
      <ListItem
        {...otherProps}
        ref={ref}
        className={cnFlatSelectItem(null, [className])}
        aria-selected={active}
        aria-disabled={disabled}
        role="option"
        label={label}
        innerOffset={indent}
        size={size}
        active={hovered}
        checked={!multiple && active}
        disabled={disabled}
        onClick={onClick}
        leftSide={
          multiple && (
            <Checkbox
              checked={active}
              disabled={disabled}
              size={sizeCheckboxMap[size]}
            />
          )
        }
      >
        {label}
      </ListItem>
    );
  },
);
