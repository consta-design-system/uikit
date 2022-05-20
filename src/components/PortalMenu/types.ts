import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { BadgePropStatus, BadgePropView } from '../Badge/Badge';

export const portalMenuPropView = ['navigation', 'packages', 'components'] as const;
export type PortalMenuPropView = typeof portalMenuPropView[number];
export const portalMenuPropViewDefault: PortalMenuPropView = portalMenuPropView[0];

export type PortalMenuOnClick<ITEM> = (args: { e: React.MouseEvent; item: ITEM }) => void;

export type PortalMenuPropSortGroup = (a: string | number, b: string | number) => number;

export type DefaultNavigationItem = {
  key: string;
  label: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  subMenu?: DefaultNavigationItem[];
};

export type DefaultMenuGroup = {
  label?: string;
  id: string;
};

export type DefaultPackageItem = {
  key: string;
  label: string;
  active?: boolean;
  description?: string;
  groupId?: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  badgeLabel?: string;
  badgeStatus?: BadgePropStatus;
  badgeView?: BadgePropView;
};

// Navigation

export type PortalMenuPropGetNavigationKey<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetNavigationLabel<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetNavigationActive<ITEM> = (item: ITEM) => boolean | undefined;
export type PortalMenuPropGetNavigationOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type PortalMenuPropGetNavigationSubMenu<ITEM> = (item: ITEM) => ITEM[] | undefined;

// Menu

export type PortalMenuPropGetPackageKey<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetPackageLabel<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetPackageActive<ITEM> = (item: ITEM) => boolean | undefined;
export type PortalMenuPropGetPackageDescription<ITEM> = (item: ITEM) => string | undefined;
export type PortalMenuPropGetPackageOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type PortalMenuPropGetPackageBadgeLabel<ITEM> = (item: ITEM) => string | undefined;
export type PortalMenuPropGetPackageBadgeStatus<ITEM> = (item: ITEM) => BadgePropStatus | undefined;
export type PortalMenuPropGetPackageBadgeView<ITEM> = (item: ITEM) => BadgePropView | undefined;
export type PortalMenuPropGetPackageGroupId<ITEM> = (item: ITEM) => string | undefined;

// Group

export type PortalMenuPropGetGroupKey<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetGroupLabel<ITEM> = (item: ITEM) => string | undefined;

export type NavigationMappers<ITEM> = {
  getNavigationKey?: PortalMenuPropGetNavigationKey<ITEM>;
  getNavigationLabel?: PortalMenuPropGetNavigationLabel<ITEM>;
  getNavigationActive?: PortalMenuPropGetNavigationActive<ITEM>;
  getNavigationOnClick?: PortalMenuPropGetNavigationOnClick<ITEM>;
  getNavigationSubMenu?: PortalMenuPropGetNavigationSubMenu<ITEM>;
};

export type PackageMappers<ITEM> = {
  getPackageKey?: PortalMenuPropGetPackageKey<ITEM>;
  getPackageLabel?: PortalMenuPropGetPackageLabel<ITEM>;
  getPackageActive?: PortalMenuPropGetPackageActive<ITEM>;
  getPackageDescription?: PortalMenuPropGetPackageDescription<ITEM>;
  getPackageOnClick?: PortalMenuPropGetPackageOnClick<ITEM>;
  getPackageBadgeLabel?: PortalMenuPropGetPackageBadgeLabel<ITEM>;
  getPackageBadgeStatus?: PortalMenuPropGetPackageBadgeStatus<ITEM>;
  getPackageBadgeView?: PortalMenuPropGetPackageBadgeView<ITEM>;
  getPackageGroupId?: PortalMenuPropGetPackageGroupId<ITEM>;
};

export type GroupMappers<ITEM> = {
  getGroupKey?: PortalMenuPropGetGroupKey<ITEM>;
  getGroupLabel?: PortalMenuPropGetGroupLabel<ITEM>;
};

export type PortalMenuProps<
  NAVIGATION_ITEM = DefaultNavigationItem,
  PACKAGE_ITEM = DefaultPackageItem,
  GROUP = DefaultMenuGroup
> = PropsWithHTMLAttributesAndRef<
  {
    view: PortalMenuPropView;
    onNavigationClick?: PortalMenuOnClick<NAVIGATION_ITEM>;
    onPackageClick?: PortalMenuOnClick<PACKAGE_ITEM>;
    additionalControls?: React.ReactElement;
    navigation?: NAVIGATION_ITEM[];
    sortGroup?: PortalMenuPropSortGroup;
    packages?: PACKAGE_ITEM[];
    groups?: GROUP[];
  },
  HTMLDivElement
> &
  NavigationMappers<NAVIGATION_ITEM> &
  PackageMappers<PACKAGE_ITEM> &
  GroupMappers<GROUP> &
  (NAVIGATION_ITEM extends { key: DefaultNavigationItem['key'] | unknown }
    ? {}
    : {
        getNavigationKey: PortalMenuPropGetNavigationKey<NAVIGATION_ITEM>;
      }) &
  (NAVIGATION_ITEM extends { label: DefaultNavigationItem['label'] | unknown }
    ? {}
    : {
        getNavigationLabel: PortalMenuPropGetNavigationLabel<NAVIGATION_ITEM>;
      }) &
  (PACKAGE_ITEM extends { key: DefaultPackageItem['key'] | unknown }
    ? {}
    : {
        getPackageKey: PortalMenuPropGetPackageKey<PACKAGE_ITEM>;
      }) &
  (PACKAGE_ITEM extends { label: DefaultPackageItem['label'] | unknown }
    ? {}
    : {
        getPackageLabel: PortalMenuPropGetPackageLabel<PACKAGE_ITEM>;
      }) &
  (GROUP extends { id: DefaultMenuGroup['id'] | unknown }
    ? {}
    : {
        getGroupKey: PortalMenuPropGetGroupKey<PACKAGE_ITEM>;
      });

export type PortalMenuComponent = <
  NAVIGATION_ITEM = DefaultNavigationItem,
  MENU_ITEM = DefaultPackageItem,
  GROUP = DefaultMenuGroup
>(
  props: PortalMenuProps<NAVIGATION_ITEM, MENU_ITEM, GROUP>,
) => React.ReactElement | null;

export type PortalMenuPackageProps<ITEM, GROUP> = {
  packages: ITEM[];
  groups?: GROUP[];
  onPackageClick?: PortalMenuOnClick<ITEM>;
  className?: string;
  sortGroup?: PortalMenuPropSortGroup;
} & Required<PackageMappers<ITEM>> &
  Required<GroupMappers<GROUP>>;

export type PortalMenuPackageItemProps<ITEM> = {
  item: ITEM;
  onClick?: React.MouseEventHandler;
  className?: string;
} & Required<PackageMappers<ITEM>>;

export type PortalMenuNavigationProps<ITEM> = {
  navigation?: ITEM[];
  onNavigationClick?: PortalMenuOnClick<ITEM>;
  className?: string;
} & Required<NavigationMappers<ITEM>>;

export type PortalMenuNavigationItemProps<ITEM> = {
  item: ITEM;
  onClick?: React.MouseEventHandler;
  className?: string;
  deep?: number;
} & Required<NavigationMappers<ITEM>>;
