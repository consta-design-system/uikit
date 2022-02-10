import { IconComponent } from '../../icons/Icon/Icon';
import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '../../utils/types/PropsWithHTMLAttributes';

import { SnackBarItemDefault } from './SnackBar';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};

export type SnackBarActionButtonProps = {
  actions: SnackBarPropItemAction[];
  className?: string;
};

export type SnackBarItemProps = PropsWithHTMLAttributesAndRef<
  Omit<SnackBarItemDefault, 'onClose' | 'onAutoClose'> & {
    className?: string;
    onClose?: () => void;
    onAutoClose?: () => void;
  },
  HTMLDivElement
>;

export const snackBarItemStatus = ['normal', 'system', 'success', 'warning', 'alert'] as const;
export type SnackBarItemStatus = typeof snackBarItemStatus[number];
export const snackBarItemStatusDefault: SnackBarItemStatus = snackBarItemStatus[0];

export const snackBarItemShowProgressProp = ['timer', 'line'] as const;
export type SnackBarItemShowProgressProp = typeof snackBarItemShowProgressProp[number];

export type SnackBarPropGetItemKey<ITEM> = (item: ITEM) => string;
export type SnackBarPropGetItemMessage<ITEM> = (item: ITEM) => React.ReactNode | undefined;
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

export type Mappers<ITEM> = {
  getItemKey?: SnackBarPropGetItemKey<ITEM>;
  getItemMessage?: SnackBarPropGetItemMessage<ITEM>;
  getItemStatus?: SnackBarPropGetItemStatus<ITEM>;
  getItemAutoClose?: SnackBarPropGetItemAutoClose<ITEM>;
  getItemShowProgress?: SnackBarPropGetItemShowProgress<ITEM>;
  getItemIcon?: SnackBarPropGetItemIcon<ITEM>;
  getItemActions?: SnackBarPropGetItemActions<ITEM>;
  getItemOnClose?: SnackBarPropGetItemOnClose<ITEM>;
  getItemOnAutoClose?: SnackBarPropGetItemOnAutoClose<ITEM>;
};

export type SnackBarProps<ITEM = SnackBarItemDefault> = PropsWithHTMLAttributes<
  {
    items: ITEM[];
    children?: never;
  } & Mappers<ITEM>,
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

export type SnackBarItemComponent = <ITEM = SnackBarItemDefault>(
  props: SnackBarItemProps,
) => React.ReactElement | null;

export type GetItem = <ITEM>(
  item: ITEM,
  params: {
    getItemKey: SnackBarPropGetItemKey<ITEM>;
    getItemMessage: SnackBarPropGetItemMessage<ITEM>;
    getItemStatus: SnackBarPropGetItemStatus<ITEM>;
    getItemAutoClose: SnackBarPropGetItemAutoClose<ITEM>;
    getItemShowProgress: SnackBarPropGetItemShowProgress<ITEM>;
    getItemIcon: SnackBarPropGetItemIcon<ITEM>;
    getItemActions: SnackBarPropGetItemActions<ITEM>;
    getItemOnClose: SnackBarPropGetItemOnClose<ITEM>;
    getItemOnAutoClose: SnackBarPropGetItemOnAutoClose<ITEM>;
  },
) => Omit<SnackBarItemDefault, 'onClose' | 'onAutoClose'> & {
  onClose?: () => void;
  onAutoClose?: () => void;
};
