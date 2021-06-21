import './SelectItem.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Checkbox, CheckboxPropSize } from '../../Checkbox/Checkbox';
import { PropSize } from '../types';

export type SelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    multiple: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
    disabled: boolean | undefined;
  },
  HTMLDivElement
>;

export const cnSelectItem = cn('SelectItem');

const sizeCheckboxMap: Record<PropSize, CheckboxPropSize> = {
  xs: 'm',
  s: 'm',
  m: 'l',
  l: 'l',
};

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const {
    className,
    label,
    active,
    hovered,
    multiple,
    size,
    indent,
    disabled,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cnSelectItem({ active, hovered, multiple, size, indent, disabled }, [className])}
      aria-selected={active}
      aria-disabled={disabled}
      role="option"
    >
      {multiple && (
        <Checkbox
          className={cnSelectItem('Checkbox')}
          checked={active}
          size={getSizeByMap(sizeCheckboxMap, size)}
        />
      )}
      {label}
    </div>
  );
};
