import './SelectItem.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Checkbox, CheckboxPropSize } from '../../Checkbox/Checkbox';
import { PropSize } from '../types';

type SelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    multi: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnSelectItem = cn('SelectItem');

// в дальнейшем уберем обязательность onChange у Checkbox
// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const sizeCheckboxMap: Record<PropSize, CheckboxPropSize> = {
  xs: 'm',
  s: 'm',
  m: 'l',
  l: 'l',
};

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const { className, label, active, hovered, multi, size, indent, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cnSelectItem({ active, hovered, multi, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      {multi && (
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
