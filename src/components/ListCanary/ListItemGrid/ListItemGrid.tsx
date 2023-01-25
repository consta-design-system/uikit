import './ListItemGrid.css';

import React from 'react';

import { IconComponent } from '##/icons/Icon';
import { cn } from '##/utils/bem';

import { mapIconSize } from '../maps';
import { ListPropSize } from '../types';

export const cnListItemGrid = cn('ListItemGrid');

export const renderSlot = (
  side: React.ReactNode,
  position: 'left' | 'right',
  size: ListPropSize,
  icon: IconComponent | undefined,
) => {
  const sides: React.ReactNode[] = side
    ? [...(Array.isArray(side) ? side : [side])]
    : [];
  if (icon) {
    const Icon = icon;
    const render = <Icon size={mapIconSize[size]} />;
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
