import { BadgePropStatus } from '##/components/Badge';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationsItemBadge = {
  label: string;
  status?: BadgePropStatus;
};

export type NotificationsItemFooterProps = PropsWithHTMLAttributesAndRef<
  {
    date?: Date;
    dateFormat?: (date: Date) => string;
    badges?: NotificationsItemBadge[];
    children?: never;
  },
  HTMLDivElement
>;
