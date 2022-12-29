import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const breadcrumbPropSize = ['m', 'xs', 's', 'l'] as const;
export type BreadcrumbPropSize = typeof breadcrumbPropSize[number];
export const breadcrumbPropSizeDefault = breadcrumbPropSize[0];

export const breadcrumbPropFitMode = ['dropdown', 'scroll'] as const;
export type BreadcrumbPropFitMode = typeof breadcrumbPropFitMode[number];
export const breadcrumbPropFitModeDefault = breadcrumbPropFitMode[0];

export type BreadcrumbsPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type BreadcrumbsPropGetItemHref<ITEM> = (
  item: ITEM,
) => string | undefined;
export type BreadcrumbsPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type BreadcrumbsPropGetItemSubMenu<ITEM> = (
  item: ITEM,
) => ITEM[] | undefined;
export type BreadcrumbsPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.MouseEventHandler | undefined;
export type BreadcrumbsPropOnItemClick<ITEM> = (props: {
  item: ITEM;
  e: React.MouseEvent;
}) => void;

export type DefaultItem = {
  label: string;
  icon?: IconComponent;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  subMenu?: DefaultItem[];
};

export type RenderItem<ITEM> = (
  item: ITEM | undefined,
  index: number | string,
  isFirst?: boolean,
  isLast?: boolean,
  ref?: React.Ref<HTMLLIElement>,
  hidden?: boolean,
) => React.ReactElement | undefined;

export type BreadcrumbsProps<ITEM = DefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      items: ITEM[];
      getItemLabel?: BreadcrumbsPropGetItemLabel<ITEM>;
      getItemHref?: BreadcrumbsPropGetItemHref<ITEM>;
      getItemIcon?: BreadcrumbsPropGetItemIcon<ITEM>;
      getItemOnClick?: BreadcrumbsPropGetItemOnClick<ITEM>;
      getItemSubMenu?: BreadcrumbsPropGetItemSubMenu<ITEM>;
      onItemClick?: BreadcrumbsPropOnItemClick<ITEM>;
      size?: BreadcrumbPropSize;
      onlyIconRoot?: boolean;
      fitMode?: BreadcrumbPropFitMode;
      lastItemIsLink?: boolean;
    },
    HTMLUListElement
  > &
    (ITEM extends { label: DefaultItem['label'] }
      ? {}
      : { getItemLabel: BreadcrumbsPropGetItemLabel<ITEM> });

export type BreadcrumbsComponent = <ITEM>(
  props: BreadcrumbsProps<ITEM>,
) => React.ReactElement | null;

export type BreadcrumbsMoreProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    size: BreadcrumbPropSize;
    items: ITEM[];
    getItemLabel: BreadcrumbsPropGetItemLabel<ITEM>;
    getItemHref: BreadcrumbsPropGetItemHref<ITEM>;
    getItemIcon: BreadcrumbsPropGetItemIcon<ITEM>;
    getItemSubMenu: BreadcrumbsPropGetItemSubMenu<ITEM>;
    getItemOnClick: BreadcrumbsPropGetItemOnClick<ITEM>;
    onItemClick?: BreadcrumbsPropOnItemClick<ITEM>;
  },
  HTMLLIElement
>;

export type BreadcrumbsMoreComponent = <ITEM>(
  props: BreadcrumbsMoreProps<ITEM>,
) => React.ReactElement | null;

export type BreadcrumbsItemProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    size: 'm' | 'xs' | 's' | 'l';
    item?: ITEM;
    getItemLabel?: BreadcrumbsPropGetItemLabel<ITEM>;
    getItemHref?: BreadcrumbsPropGetItemHref<ITEM>;
    getItemIcon?: BreadcrumbsPropGetItemIcon<ITEM>;
    getItemSubMenu?: BreadcrumbsPropGetItemSubMenu<ITEM>;
    active?: boolean;
    onlyIcon?: boolean;
    delimiter?: boolean;
    onItemClick?: BreadcrumbsPropOnItemClick<ITEM>;
  },
  HTMLLIElement
>;

export type BreadcrumbsItemComponent = <ITEM>(
  props: BreadcrumbsItemProps<ITEM>,
) => React.ReactElement | null;

export type BreadcrumbsFitModeDropdownProps<ITEM> =
  PropsWithHTMLAttributesAndRef<
    {
      items: ITEM[];
      getItemLabel: BreadcrumbsPropGetItemLabel<ITEM>;
      getItemHref: BreadcrumbsPropGetItemHref<ITEM>;
      getItemIcon: BreadcrumbsPropGetItemIcon<ITEM>;
      getItemOnClick: BreadcrumbsPropGetItemOnClick<ITEM>;
      getItemSubMenu: BreadcrumbsPropGetItemSubMenu<ITEM>;
      onItemClick?: BreadcrumbsPropOnItemClick<ITEM>;
      renderItem: RenderItem<ITEM>;
      size: BreadcrumbPropSize;
    },
    HTMLUListElement
  >;

export type BreadcrumbsFitModeDropdownComponent = <ITEM>(
  props: BreadcrumbsFitModeDropdownProps<ITEM>,
) => React.ReactElement | null;

export type BreadcrumbsFitModeScrollProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    renderItem: RenderItem<ITEM>;
  },
  HTMLUListElement
>;

export type BreadcrumbsFitModeScrollComponent = <ITEM>(
  props: BreadcrumbsFitModeScrollProps<ITEM>,
) => React.ReactElement | null;

export type BreadcrumbsShortListComponent = <ITEM>(
  props: BreadcrumbsFitModeScrollProps<ITEM>,
) => React.ReactElement | null;
