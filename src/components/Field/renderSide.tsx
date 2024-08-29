import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { FieldPropSize, getFieldIconSize } from '.';

export const renderSide = (
  side: string | IconComponent | undefined,
  fieldSize: FieldPropSize,
  iconSize: IconPropSize | undefined,
) => {
  if (typeof side === 'function') {
    const Icon = side;
    return <Icon size={getFieldIconSize(fieldSize, iconSize)} />;
  }
  return side;
};
