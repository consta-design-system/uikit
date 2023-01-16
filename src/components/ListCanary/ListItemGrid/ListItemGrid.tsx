import './ListItemGrid.css';

import React from 'react';

import { IconComponent, IconPropSize } from '##/icons/Icon';
import { cn } from '##/utils/bem';
import { getByMap } from '##/utils/getByMap';

import { ListPropSize } from '../types';

const iconSizeMap: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const cnListItemGrid = cn('ListItemGrid');

export const renderSlot = (
  side: React.ReactNode,
  position: 'left' | 'right',
  size: ListPropSize,
  icon: IconComponent | undefined,
) => {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];
  if (icon) {
    const Icon = icon;
    const render = <Icon size={getByMap(iconSizeMap, size)} />;
    if (position === 'left') {
      sides.push(render);
    }
    if (position === 'right') {
      sides.unshift(render);
    }
  }
  return sides.map((item, index) => (
    <div
      className={cnListItemGrid('Slot', {
        position,
      })}
      key={cnListItemGrid('Slot', {
        position,
        index,
      })}
    >
      {item}
    </div>
  ));
};
