import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { isDefined, isString } from '##/utils/type-guards';

import { FieldPropSize, getFieldIconSize } from '.';

export const renderSide = (
  side: string | IconComponent | undefined,
  fieldSize: FieldPropSize,
  iconSize: IconPropSize | undefined,
) => {
  if (isString(side) || !isDefined(side)) {
    return side;
  }

  const Icon = side;
  return <Icon size={getFieldIconSize(fieldSize, iconSize)} />;
};
