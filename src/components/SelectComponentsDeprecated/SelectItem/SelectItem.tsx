import './SelectItem.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Checkbox, CheckboxPropSize } from '../../Checkbox/Checkbox';
import { PropSize } from '../types';

export type SelectItemProps<ITEM> = PropsWithHTMLAttributes<
  {
    label: string;
    item: ITEM;
    active: boolean;
    hovered: boolean;
    multiple: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnSelectItem = cn('SelectItemDeprecated');

// в дальнейшем уберем обязательность onChange у Checkbox
// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const sizeCheckboxMap: Record<PropSize, CheckboxPropSize> = {
  xs: 'm',
  s: 'm',
  m: 'l',
  l: 'l',
};
type SelectItem = <ITEM>(props: SelectItemProps<ITEM>) => React.ReactElement | null;

export const SelectItem: SelectItem = (props) => {
  const { className, label, active, hovered, multiple, size, indent, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cnSelectItem({ active, hovered, multiple, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      {multiple && (
        <Checkbox
          className={cnSelectItem('Checkbox')}
          checked={active}
          onChange={emptyFunction}
          size={getSizeByMap(sizeCheckboxMap, size)}
        />
      )}
      {label}
    </div>
  );
};
