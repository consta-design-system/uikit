import React from 'react';

import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type TabDimensions = {
  size: number;
  gap: number;
};

export type TabsItemDefault = {
  label: string | number;
  icon?: IconComponent;
};

export const tabsSizes = ['m', 's', 'xs'] as const;
export type TabsPropSize = typeof tabsSizes[number];
export const tabsDefaultSize: TabsPropSize = tabsSizes[0];

export const tabsViews = ['bordered', 'clear'] as const;
export type TabsPropView = typeof tabsViews[number];
export const tabsDefaultView: TabsPropView = tabsViews[0];

export const tabsLinePositions = ['bottom', 'top', 'left', 'right'] as const;
export type TabsPropLinePosition = typeof tabsLinePositions[number];
export const tabsDefaultLinePosition: TabsPropLinePosition = 'bottom';

export const tabsFitModes = ['scroll', 'dropdown'] as const;
export type TabsPropFitMode = typeof tabsFitModes[number];
export const tabsDefaultFitMode: TabsPropFitMode = 'dropdown';

export type TabsPropGetItemLabel<ITEM> = (item: ITEM) => string | number;
export type TabsPropGetItemChecked<ITEM> = (item: ITEM) => boolean | undefined;
export type TabsPropGetItemIcon<ITEM> = (item: ITEM) => IconComponent | undefined;

export type TabsPropOnChange<ITEM> = (props: { e: React.MouseEvent; value: ITEM }) => void;

export type RenderItemProps<ITEM> = {
  item: ITEM;
  onChange: React.MouseEventHandler;
  checked: boolean;
  label: string;
  icon?: IconComponent;
  size: TabsPropSize;
  iconSize?: IconPropSize;
  onlyIcon?: boolean;
};

export type RenderItem<ITEM> = (props: RenderItemProps<ITEM>) => React.ReactElement | null;

export type TabsFitModeWrapperProps<ITEM> = {
  items: ITEM[];
  tabsDimensions: TabDimensions[];
  getItemLabel: TabsPropGetItemLabel<ITEM>;
  getItemChecked: TabsPropGetItemChecked<ITEM>;
  renderItem: (item: ITEM) => React.ReactNode;
  renderItemsList: RenderItemsListProp;
  tabRefs: Array<React.RefObject<HTMLElement>>;
};

export type TabsProps<ITEM = TabsItemDefault> = PropsWithHTMLAttributesAndRef<
  {
    size?: TabsPropSize;
    onlyIcon?: boolean;
    view?: TabsPropView;
    iconSize?: IconPropSize;
    items: ITEM[];
    value?: ITEM | null;
    getItemIcon?: TabsPropGetItemIcon<ITEM>;
    getItemLabel?: TabsPropGetItemLabel<ITEM>;
    children?: never;
    onChange: TabsPropOnChange<ITEM>;
    renderItem?: RenderItem<ITEM>;
  } & (
    | {
        linePosition?: Extract<TabsPropLinePosition, 'bottom' | 'top'>;
        fitMode?: 'dropdown' | 'scroll';
      }
    | {
        linePosition: Extract<TabsPropLinePosition, 'left' | 'right'>;
        fitMode?: never;
      }
  ),
  HTMLDivElement
> &
  (ITEM extends { label: TabsItemDefault['label'] }
    ? {}
    : {
        getItemLabel: TabsPropGetItemLabel<ITEM>;
      });

export type TabsComponent = <ITEM>(props: TabsProps<ITEM>) => React.ReactElement | null;

export type TabsTabProps = {
  size: TabsPropSize;
  onlyIcon?: boolean;
  icon?: IconComponent;
  iconSize?: IconPropSize;
  label: string;
  checked: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export type TabsMoreItemsProps<ITEM = TabsItemDefault> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    renderItem: (item: ITEM, onClick: () => void) => React.ReactNode;
    getItemLabel: TabsPropGetItemLabel<ITEM>;
    getItemChecked: TabsPropGetItemChecked<ITEM>;
    height: number;
  } & React.RefAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TabsMoreItemsComponent = <ITEM>(
  props: TabsMoreItemsProps<ITEM>,
) => React.ReactElement | null;

export type RenderItemsListProp = (props: {
  withRunningLine?: boolean;
  getTabClassName?: (idx: number) => string | undefined;
}) => React.ReactNode;

export type TabsDirection = 'horizontal' | 'vertical';
