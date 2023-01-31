import './ContextMenuGroupHeader.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Text, TextPropSize } from '../../Text/Text';
import { contextMenuDefaultSize, ContextMenuPropSize } from '../helpers';

export const cnContextMenuGroupHeader = cn('ContextMenuGroupHeaderDeprecated');

const sizeMap: Record<ContextMenuPropSize, TextPropSize> = {
  s: '2xs',
  m: 'xs',
  l: 's',
};

export const ContextMenuGroupHeader: React.FC<{
  label: string | number;
  size?: ContextMenuPropSize;
  children?: never;
  first: boolean;
}> = ({ label, size = contextMenuDefaultSize, first }) => (
  <Text
    view="secondary"
    transform="uppercase"
    className={cnContextMenuGroupHeader({ size, first })}
    size={getByMap(sizeMap, size)}
  >
    {label}
  </Text>
);
