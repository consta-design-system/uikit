import {
  Mappers,
  SnackBarItemDefault,
  SnackBarPropGetItemActions,
  SnackBarPropGetItemAutoClose,
  SnackBarPropGetItemIcon,
  SnackBarPropGetItemKey,
  SnackBarPropGetItemMessage,
  SnackBarPropGetItemOnAutoClose,
  SnackBarPropGetItemOnClose,
  SnackBarPropGetItemShowProgress,
  SnackBarPropGetItemStatus,
  SnackBarProps,
} from './types';

const defaultGetItemKey: SnackBarPropGetItemKey<SnackBarItemDefault> = (item) =>
  item.key;
const defaultGetItemMessage: SnackBarPropGetItemMessage<SnackBarItemDefault> = (
  item,
) => item.message;
const defaultGetItemStatus: SnackBarPropGetItemStatus<SnackBarItemDefault> = (
  item,
) => item.status;
const defaultGetItemAutoClose: SnackBarPropGetItemAutoClose<
  SnackBarItemDefault
> = (item) => item.autoClose;
const defaultGetItemShowProgress: SnackBarPropGetItemShowProgress<
  SnackBarItemDefault
> = (item) => item.showProgress;
const defaultGetItemIcon: SnackBarPropGetItemIcon<SnackBarItemDefault> = (
  item,
) => item.icon;
const defaultGetItemActions: SnackBarPropGetItemActions<SnackBarItemDefault> = (
  item,
) => item.actions;
const defaultGetItemOnClose: SnackBarPropGetItemOnClose<SnackBarItemDefault> = (
  item,
) => item.onClose;
const defaultGetItemOnAutoClose: SnackBarPropGetItemOnAutoClose<
  SnackBarItemDefault
> = (item) => item.onAutoClose;

export const withDefaultGetters = (props: SnackBarProps) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemMessage: props.getItemMessage || defaultGetItemMessage,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemAutoClose: props.getItemAutoClose || defaultGetItemAutoClose,
    getItemShowProgress:
      props.getItemShowProgress || defaultGetItemShowProgress,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemOnClose: props.getItemOnClose || defaultGetItemOnClose,
    getItemOnAutoClose: props.getItemOnAutoClose || defaultGetItemOnAutoClose,
  };
};

export const getItem = <ITEM>(
  item: ITEM,
  props: Required<Mappers<ITEM>> & {
    onItemClose?: (item: ITEM) => void;
    onItemAutoClose?: (item: ITEM) => void;
  },
) => {
  const {
    getItemKey,
    getItemActions,
    getItemAutoClose,
    getItemIcon,
    getItemMessage,
    getItemOnAutoClose,
    getItemOnClose,
    getItemShowProgress,
    getItemStatus,
    onItemClose,
    onItemAutoClose,
  } = props;
  return {
    key: getItemKey(item),
    message: getItemMessage(item),
    status: getItemStatus(item),
    autoClose: getItemAutoClose(item),
    showProgress: getItemShowProgress(item),
    icon: getItemIcon(item),
    actions: getItemActions(item),
    onClose:
      typeof getItemOnClose(item) === 'function' ||
      typeof onItemClose === 'function'
        ? () => {
            getItemOnClose(item)?.(item);
            onItemClose?.(item);
          }
        : undefined,
    onAutoClose:
      typeof getItemOnAutoClose(item) === 'function' ||
      typeof onItemAutoClose === 'function'
        ? () => {
            getItemOnAutoClose(item)?.(item);
            onItemAutoClose?.(item);
          }
        : undefined,
  };
};
