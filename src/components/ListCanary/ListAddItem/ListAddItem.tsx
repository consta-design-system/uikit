import './ListAddItem.css';

import React, { forwardRef } from 'react';

import { IconPropSize } from '##/icons/Icon';
import { IconAdd } from '##/icons/IconAdd';
import { cn } from '##/utils/bem';

import { defaultListPropSize, ListAddItemProps, ListPropSize } from '../types';

const cnListAddItem = cn('ListAddItem');

const iconSizeMap: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const ListAddItem = forwardRef<HTMLDivElement, ListAddItemProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      className,
      disabled,
      label,
      ...otherProps
    } = props;
    return (
      <div
        className={cnListAddItem({ size, disabled }, [className])}
        ref={ref}
        {...otherProps}
      >
        <IconAdd
          className={cnListAddItem('AddIcon')}
          size={iconSizeMap[size]}
        />
        {label}
      </div>
    );
  },
);
