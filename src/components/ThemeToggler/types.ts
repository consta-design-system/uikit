import { IconComponent } from '@consta/icons/Icon';

import { ButtonPropView } from '##/components/Button';
import { Direction } from '##/components/Popover';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const themeTogglerPropSize = ['m', 'l', 's', 'xs'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize =
  themeTogglerPropSize[0];

export type ThemeTogglerPropSetValue<ITEM> = (props: {
  e: React.MouseEvent;
  value: ITEM;
}) => void;
export type ThemeTogglerPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type ThemeTogglerPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type ThemeTogglerPropGetItemIcon<ITEM> = (item: ITEM) => IconComponent;

export type ThemeTogglerItemDefault = {
  key: string;
  label: string;
  icon: IconComponent;
};

export type ThemeTogglerProps<ITEM = ThemeTogglerItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      size?: ThemeTogglerPropSize;
      className?: string;
      items: ITEM[];
      value: ITEM;
      onChange: ThemeTogglerPropSetValue<ITEM>;
      getItemKey?: ThemeTogglerPropGetItemKey<ITEM>;
      getItemLabel?: ThemeTogglerPropGetItemLabel<ITEM>;
      getItemIcon?: ThemeTogglerPropGetItemIcon<ITEM>;
      direction?: Direction;
      possibleDirections?: readonly Direction[];
      children?: never;
      view?: ButtonPropView;
    },
    HTMLButtonElement
  > &
    (ITEM extends { key: ThemeTogglerItemDefault['key'] }
      ? {}
      : { getItemKey: ThemeTogglerPropGetItemLabel<ITEM> }) &
    (ITEM extends { label: ThemeTogglerItemDefault['label'] }
      ? {}
      : { getItemLabel: ThemeTogglerPropGetItemLabel<ITEM> }) &
    (ITEM extends { icon: ThemeTogglerItemDefault['icon'] }
      ? {}
      : { getItemIcon: ThemeTogglerPropGetItemIcon<ITEM> });

export type ThemeTogglerComponent = <ITEM>(
  props: ThemeTogglerProps<ITEM>,
) => React.ReactElement | null;
