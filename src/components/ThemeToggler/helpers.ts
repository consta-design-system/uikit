import { IconPropSize } from '@consta/icons/Icon';

import { ContextMenuPropSize } from '../ContextMenu';
import {
  ThemeTogglerItemDefault,
  ThemeTogglerPropGetItemIcon,
  ThemeTogglerPropGetItemKey,
  ThemeTogglerPropGetItemLabel,
  ThemeTogglerProps,
  ThemeTogglerPropSize,
} from './types';

const defaultGetItemKey: ThemeTogglerPropGetItemKey<ThemeTogglerItemDefault> = (
  item,
) => item.key;
const defaultGetItemLabel: ThemeTogglerPropGetItemLabel<
  ThemeTogglerItemDefault
> = (item) => item.label;
const defaultGetItemIcon: ThemeTogglerPropGetItemIcon<
  ThemeTogglerItemDefault
> = (item) => item.icon;

export function withDefaultGetters(props: ThemeTogglerProps) {
  return {
    ...props,
    getItemKey: props.getItemKey || props.getItemLabel || defaultGetItemKey,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
  };
}

export const iconSizeMap: Record<ThemeTogglerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const contextMenuSizeMap: Record<
  ThemeTogglerPropSize,
  ContextMenuPropSize
> = {
  l: 'l',
  m: 'm',
  s: 's',
  xs: 's',
};
