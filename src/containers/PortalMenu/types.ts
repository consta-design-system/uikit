import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';
// import { Badge } from '../Badge/Badge';

export type PortalMenuOnClick<ITEM> = (args: { e: React.MouseEvent; item: ITEM }) => void;

export type PortalMenuPropSortGroup = (a: string | number, b: string | number) => number;

type BadgeComponent = React.ReactElement;

export type DefaultMenuGroup = {
  label?: string;
  id: string;
};

export type DefaultMenuItem = {
  key: string;
  label: string;
  active?: boolean;
  description?: string;
  groupId?: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  badge?: BadgeComponent;
  href?: string;
  params?: Record<string, string>;
  subMenu?: DefaultMenuItem[];
};

// Items

export type PortalMenuPropGetItemKey<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetItemActive<ITEM> = (item: ITEM) => boolean | undefined;
export type PortalMenuPropGetItemDescription<ITEM> = (item: ITEM) => string | undefined;
export type PortalMenuPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type PortalMenuPropGetItemBadge<ITEM> = (item: ITEM) => BadgeComponent | undefined;
export type PortalMenuPropGetItemGroupId<ITEM> = (item: ITEM) => string | undefined;
export type PortalMenuPropGetItemSubMenu<ITEM> = (item: ITEM) => ITEM[] | undefined;
export type PortalMenuPropGetItemHref<ITEM> = (item: ITEM) => string | undefined;
export type PortalMenuPropGetItemParams<ITEM> = (item: ITEM) => Record<string, string> | undefined;

// Group

export type PortalMenuPropGetGroupKey<GROUP> = (group: GROUP) => string;
export type PortalMenuPropGetGroupLabel<GROUP> = (group: GROUP) => string | undefined;

export type PortalMenuProps<
  ITEM = DefaultMenuItem,
  GROUP = DefaultMenuGroup,
> = PropsWithHTMLAttributesAndRef<
  {
    onItemClick?: PortalMenuOnClick<ITEM>;
    additionalControls?: React.ReactElement;
    items: ITEM[];
    getItemLabel?: PortalMenuPropGetItemLabel<ITEM>;
    getItemActive?: PortalMenuPropGetItemActive<ITEM>;
    getItemDescription?: PortalMenuPropGetItemDescription<ITEM>;
    getItemOnClick?: PortalMenuPropGetItemOnClick<ITEM>;
    getItemBadge?: PortalMenuPropGetItemBadge<ITEM>;
    getItemGroupId?: PortalMenuPropGetItemGroupId<ITEM>;
    getItemSubMenu?: PortalMenuPropGetItemSubMenu<ITEM>;
    getItemParams?: PortalMenuPropGetItemParams<ITEM>;
    getItemHref?: PortalMenuPropGetItemHref<ITEM>;
    getGroupKey?: PortalMenuPropGetGroupKey<GROUP>;
    getGroupLabel?: PortalMenuPropGetGroupLabel<GROUP>;
    groups?: GROUP[];
    groupsByItems?: boolean;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultMenuItem['label'] | unknown }
    ? {}
    : {
        getItemLabel: PortalMenuPropGetItemLabel<ITEM>;
      }) &
  (GROUP extends { id: DefaultMenuGroup['id'] | unknown }
    ? {}
    : {
        getGroupKey: PortalMenuPropGetGroupKey<GROUP>;
      });

export type PortalMenuComponent = <ITEM = DefaultMenuItem, GROUP = DefaultMenuGroup>(
  props: PortalMenuProps<ITEM, GROUP>,
) => React.ReactElement | null;

export type PortalMenuItemProps<ITEM> = {
  onClick?: React.MouseEventHandler;
  className?: string;
  deep?: number;
  item: ITEM;
  getItemLabel: PortalMenuPropGetItemLabel<ITEM>;
  getItemActive: PortalMenuPropGetItemActive<ITEM>;
  getItemDescription: PortalMenuPropGetItemDescription<ITEM>;
  getItemOnClick: PortalMenuPropGetItemOnClick<ITEM>;
  getItemBadge: PortalMenuPropGetItemBadge<ITEM>;
  getItemGroupId: PortalMenuPropGetItemGroupId<ITEM>;
  getItemSubMenu: PortalMenuPropGetItemSubMenu<ITEM>;
  getItemHref: PortalMenuPropGetItemHref<ITEM>;
  getItemParams: PortalMenuPropGetItemParams<ITEM>;
};
