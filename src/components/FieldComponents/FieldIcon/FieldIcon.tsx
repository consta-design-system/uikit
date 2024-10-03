import { IconPropSize } from '@consta/icons/Icon';

import { getByMap } from '##/utils/getByMap';

import { FieldPropSize } from '../types';

export const fieldIconSizeMap: Record<FieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const getFieldIconSize = (
  fieldSize: FieldPropSize,
  size?: IconPropSize,
) => getByMap(fieldIconSizeMap, fieldSize, size);
