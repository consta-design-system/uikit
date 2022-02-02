import { IconComponent } from '../../icons/Icon/Icon';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};

export type SnackBarActionButtonProps = {
  actions: SnackBarPropItemAction[];
  className?: string;
};

export type SnackBarItemProps = {
  item: Item;
  className?: string;
};

export const snackBarItemStatus = ['normal', 'system', 'success', 'warning', 'alert'] as const;
export type SnackBarItemStatus = typeof snackBarItemStatus[number];
export const snackBarItemStatusDefault: SnackBarItemStatus = snackBarItemStatus[0];

export const snackBarItemShowProgressProp = ['timer', 'line'] as const;
export type SnackBarItemShowProgressProp = typeof snackBarItemShowProgressProp[number];

export type Item = {
  key: string | number;
  message?: string | number | React.ReactNode;
  status?: SnackBarItemStatus;
  autoClose?: boolean | number;
  showProgress?: SnackBarItemShowProgressProp;
  icon?: IconComponent;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: Item) => void;
  onAutoClose?: (item: Item) => void;
};

type Props = {
  items: Item[];
  children?: never;
};

export type SnackBarProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export type SnackBarTimerPropOnMount = (object: { pause: () => void; start: () => void }) => void;

export type SnackBarTimerProps = {
  onMount: SnackBarTimerPropOnMount;
  onTimeIsOver: () => void;
  startTime: number;
  hidden?: boolean;
  className?: string;
};
