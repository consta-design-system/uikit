import { IconComponent } from '../../icons/Icon/Icon';
import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '../../utils/types/PropsWithHTMLAttributes';

import { Item } from './SnackBar';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};

export type SnackBarActionButtonProps = {
  actions: SnackBarPropItemAction[];
  className?: string;
};

export type SnackBarItemProps<ITEM = Item> = {
  item: ITEM;
  getItemKey: SnackBarPropGetItemKey<ITEM>;
  getItemMessage: SnackBarPropGetItemMessage<ITEM>;
  getItemStatus: SnackBarPropGetItemStatus<ITEM>;
  getItemAutoClose: SnackBarPropGetItemAutoClose<ITEM>;
  getItemShowProgress: SnackBarPropGetItemShowProgress<ITEM>;
  getItemIcon: SnackBarPropGetItemIcon<ITEM>;
  getItemActions: SnackBarPropGetItemActions<ITEM>;
  getItemOnClose: SnackBarPropGetItemOnClose<ITEM>;
  getItemOnAutoClose: SnackBarPropGetItemOnAutoClose<ITEM>;
  className?: string;
};

export const snackBarItemStatus = ['normal', 'system', 'success', 'warning', 'alert'] as const;
export type SnackBarItemStatus = typeof snackBarItemStatus[number];
export const snackBarItemStatusDefault: SnackBarItemStatus = snackBarItemStatus[0];

export const snackBarItemShowProgressProp = ['timer', 'line'] as const;
export type SnackBarItemShowProgressProp = typeof snackBarItemShowProgressProp[number];

export type SnackBarPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type SnackBarPropGetItemMessage<ITEM> = (
  item: ITEM,
) => string | number | React.ReactNode | undefined;
export type SnackBarPropGetItemStatus<ITEM> = (item: ITEM) => SnackBarItemStatus | undefined;
export type SnackBarPropGetItemAutoClose<ITEM> = (item: ITEM) => boolean | number | undefined;
export type SnackBarPropGetItemShowProgress<ITEM> = (
  item: ITEM,
) => SnackBarItemShowProgressProp | undefined;
export type SnackBarPropGetItemIcon<ITEM> = (item: ITEM) => IconComponent | undefined;
export type SnackBarPropGetItemActions<ITEM> = (item: ITEM) => SnackBarPropItemAction[] | undefined;
export type SnackBarPropGetItemOnClose<ITEM> = (item: ITEM) => ((item: ITEM) => void) | undefined;
export type SnackBarPropGetItemOnAutoClose<ITEM> = (
  item: ITEM,
) => ((item: ITEM) => void) | undefined;

export type SnackBarProps<ITEM = Item> = PropsWithHTMLAttributes<
  {
    items: ITEM[];
    children?: never;
    getItemKey?: SnackBarPropGetItemKey<ITEM>;
    getItemMessage?: SnackBarPropGetItemMessage<ITEM>;
    getItemStatus?: SnackBarPropGetItemStatus<ITEM>;
    getItemAutoClose?: SnackBarPropGetItemAutoClose<ITEM>;
    getItemShowProgress?: SnackBarPropGetItemShowProgress<ITEM>;
    getItemIcon?: SnackBarPropGetItemIcon<ITEM>;
    getItemActions?: SnackBarPropGetItemActions<ITEM>;
    getItemOnClose?: SnackBarPropGetItemOnClose<ITEM>;
    getItemOnAutoClose?: SnackBarPropGetItemOnAutoClose<ITEM>;
  },
  HTMLDivElement
>;

export type SnackBarTimerPropOnMount = (object: { pause: () => void; start: () => void }) => void;

export type SnackBarTimerProps = {
  onMount: SnackBarTimerPropOnMount;
  onTimeIsOver: () => void;
  startTime: number;
  hidden?: boolean;
  className?: string;
};

export type SnackBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<SnackBarItemProps, HTMLDivElement>,
) => React.ReactElement | null;

export type GetItem<ITEM = Item> = (
  item: ITEM,
  params: Omit<SnackBarItemProps<ITEM>, 'item' | 'className'>,
) => Item;
