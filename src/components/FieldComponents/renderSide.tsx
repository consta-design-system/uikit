import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { isString } from '##/utils/type-guards';

import { FieldPropSize, getFieldIconSize } from '.';

export const renderSide = (
  side: string | IconComponent | undefined,
  fieldSize: FieldPropSize,
  iconSize: IconPropSize | undefined,
  ref?: React.Ref<HTMLSpanElement>,
) => {
  if (!side) {
    return undefined;
  }

  if (isString(side)) {
    return <span ref={ref}>{side}</span>;
  }

  const Icon = side;
  return <Icon ref={ref} size={getFieldIconSize(fieldSize, iconSize)} />;
};
