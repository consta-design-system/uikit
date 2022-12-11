import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type SnackBarItemDefault = {
  key: string | number;
  message?: React.ReactNode;
  status?: SnackBarItemStatus;
  autoClose?: boolean | number;
  showProgress?: SnackBarItemShowProgressProp;
  icon?: IconComponent;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: SnackBarItemDefault) => void;
  onAutoClose?: (item: SnackBarItemDefault) => void;
};

/**
 * @deprecated since version 3.16.0 use SnackBarItemDefault
 */
export type Item = SnackBarItemDefault;

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
    onClose?: () => void;
    form?: SnackBarPropForm;
    onAutoClose?: () => void;
  },
  HTMLDivElement
>;

export const snackBarItemStatus = [
  'normal',
  'system',
  'success',
  'warning',
  'alert',
] as const;
export type SnackBarItemStatus = typeof snackBarItemStatus[number];
export const snackBarItemStatusDefault: SnackBarItemStatus =
  snackBarItemStatus[0];

export const snackBarItemShowProgressProp = ['timer', 'line'] as const;
export type SnackBarItemShowProgressProp =
  typeof snackBarItemShowProgressProp[number];

export type SnackBarPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type SnackBarPropGetItemMessage<ITEM> = (
  item: ITEM,
) => React.ReactNode | undefined;
export type SnackBarPropGetItemStatus<ITEM> = (
  item: ITEM,
) => SnackBarItemStatus | undefined;
export type SnackBarPropGetItemAutoClose<ITEM> = (
  item: ITEM,
) => boolean | number | undefined;
export type SnackBarPropGetItemShowProgress<ITEM> = (
  item: ITEM,
) => SnackBarItemShowProgressProp | undefined;
export type SnackBarPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type SnackBarPropGetItemActions<ITEM> = (
  item: ITEM,
) => SnackBarPropItemAction[] | undefined;
export type SnackBarPropGetItemOnClose<ITEM> = (
  item: ITEM,
) => ((item: ITEM) => void) | undefined;
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

export const snackBarPropForm = ['default', 'round', 'brick'] as const;
export type SnackBarPropForm = typeof snackBarPropForm[number];
export const snackBarPropFormDefault = snackBarPropForm[0];

export type SnackBarProps<ITEM = SnackBarItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      items: ITEM[];
      children?: never;
      form?: SnackBarPropForm;
      onItemClose?: (item: ITEM) => void;
      onItemAutoClose?: (item: ITEM) => void;
    } & Mappers<ITEM>,
    HTMLDivElement
  > &
    (ITEM extends { key: SnackBarItemDefault['key'] }
      ? {}
      : { getItemKey: SnackBarPropGetItemKey<ITEM> });

export type SnackBarComponent = <ITEM = SnackBarItemDefault>(
  props: SnackBarProps<ITEM>,
) => React.ReactElement | null;

export type SnackBarTimerPropOnMount = (object: {
  pause: () => void;
  start: () => void;
}) => void;

export type SnackBarTimerProps = {
  onMount: SnackBarTimerPropOnMount;
  onTimeIsOver: () => void;
  startTime: number;
  hidden?: boolean;
  className?: string;
};

export type SnackBarItemComponent = (
  props: SnackBarItemProps,
) => React.ReactElement | null;
