import { IconComponent } from '../../icons/Icon/Icon';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const breadcrumbPropSize = ['m', 'xs', 's', 'l'] as const;
export type BreadcrumbPropSize = typeof breadcrumbPropSize[number];
export const breadcrumbPropSizeDefault = breadcrumbPropSize[0];

export type BreadcrumbsPropGetItemLabel<ITEM> = (item: ITEM) => string | React.ReactNode;
export type BreadcrumbsPropGetItemActive<ITEM> = (item: ITEM) => boolean | undefined;
export type BreadcrumbsPropGetItemHref<ITEM> = (item: ITEM) => string | undefined;
export type BreadcrumbsPropGetItemIcon<ITEM> = (item: ITEM) => IconComponent | undefined;
export type BreadcrumbsPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.MouseEventHandler | undefined;
export type BreadcrumbsPropOnItemClick<ITEM> = (props: { item: ITEM; e: React.MouseEvent }) => void;

export type DefaultItem = {
  label: string;
  active?: boolean;
  icon?: IconComponent;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type BreadcrumbsProps<ITEM = DefaultItem> = {
  items: ITEM[];
  getItemLabel?: BreadcrumbsPropGetItemLabel<ITEM>;
  getItemActive?: BreadcrumbsPropGetItemActive<ITEM>;
  getItemHref?: BreadcrumbsPropGetItemHref<ITEM>;
  getItemIcon?: BreadcrumbsPropGetItemIcon<ITEM>;
  getItemOnClick?: BreadcrumbsPropGetItemOnClick<ITEM>;
  onItemClick?: BreadcrumbsPropOnItemClick<ITEM>;
  size?: BreadcrumbPropSize;
  maxCount?: number;
  onlyIconRoot?: boolean;
  className?: string;
};

export type BreadcrumbsComponent = <ITEM>(
  props: PropsWithHTMLAttributesAndRef<BreadcrumbsProps<ITEM>, HTMLUListElement>,
) => React.ReactElement | null;
