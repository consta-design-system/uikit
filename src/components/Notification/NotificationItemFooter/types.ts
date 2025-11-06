import { BadgePropStatus } from '##/components/Badge';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationItemBadge = {
  label: string;
  status?: BadgePropStatus;
};

export type NotificationItemFooterProps = PropsWithHTMLAttributesAndRef<
  {
    date?: Date;
    dateFormat?: (date: Date) => string;
    badges?: NotificationItemBadge[];
    children?: never;
  },
  HTMLDivElement
>;
