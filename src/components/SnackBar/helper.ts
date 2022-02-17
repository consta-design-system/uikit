import {
  GetItem,
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

const defaultGetItemKey: SnackBarPropGetItemKey<SnackBarItemDefault> = (item) => item.key;
const defaultGetItemMessage: SnackBarPropGetItemMessage<SnackBarItemDefault> = (item) =>
  item.message;
const defaultGetItemStatus: SnackBarPropGetItemStatus<SnackBarItemDefault> = (item) => item.status;
const defaultGetItemAutoClose: SnackBarPropGetItemAutoClose<SnackBarItemDefault> = (item) =>
  item.autoClose;
const defaultGetItemShowProgress: SnackBarPropGetItemShowProgress<SnackBarItemDefault> = (item) =>
  item.showProgress;
const defaultGetItemIcon: SnackBarPropGetItemIcon<SnackBarItemDefault> = (item) => item.icon;
const defaultGetItemActions: SnackBarPropGetItemActions<SnackBarItemDefault> = (item) =>
  item.actions;
const defaultGetItemOnClose: SnackBarPropGetItemOnClose<SnackBarItemDefault> = (item) =>
  item.onClose;
const defaultGetItemOnAutoClose: SnackBarPropGetItemOnAutoClose<SnackBarItemDefault> = (item) =>
  item.onAutoClose;

export const withDefaultGetters = <ITEM>(props: SnackBarProps<ITEM>) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemMessage: props.getItemMessage || defaultGetItemMessage,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemAutoClose: props.getItemAutoClose || defaultGetItemAutoClose,
    getItemShowProgress: props.getItemShowProgress || defaultGetItemShowProgress,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemOnClose: props.getItemOnClose || defaultGetItemOnClose,
    getItemOnAutoClose: props.getItemOnAutoClose || defaultGetItemOnAutoClose,
  } as SnackBarProps<ITEM> & Required<Mappers<ITEM>>;
};

export const getItem: GetItem = (item, params) => {
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
  } = params;
  return {
    key: getItemKey(item),
    message: getItemMessage(item),
    status: getItemStatus(item),
    autoClose: getItemAutoClose(item),
    showProgress: getItemShowProgress(item),
    icon: getItemIcon(item),
    actions: getItemActions(item),
    onClose:
      typeof getItemOnClose(item) === 'function'
        ? () => {
            getItemOnClose(item)?.(item);
          }
        : undefined,
    onAutoClose:
      typeof getItemOnAutoClose(item) === 'function'
        ? () => {
            getItemOnAutoClose(item)?.(item);
          }
        : undefined,
  };
};
