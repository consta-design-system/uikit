import './ContextMenuDivider.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { contextMenuDefaultSize, ContextMenuPropSize } from '../helpers';

const cnContextMenuDivider = cn('ContextMenuDividerDeprecated');

export const ContextMenuDivider: React.FC<{
  size?: ContextMenuPropSize;
  children?: never;
}> = (props) => {
  const { size = contextMenuDefaultSize } = props;
  return <div className={cnContextMenuDivider({ size })} />;
};
