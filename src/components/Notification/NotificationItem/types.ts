import { IconProps } from '@consta/icons/Icon';
import React from 'react';

import { BadgePropStatus } from '##/components/Badge';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationItemAction = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: React.FC<IconProps>;
};

export type NotificationItemBadge = {
  label: string;
  status?: BadgePropStatus;
};

export type NotificationItemProps = PropsWithHTMLAttributesAndRef<
  {
    title: string;
    description?: string;
    imageUrl?: string;
    read?: boolean;
    date?: Date;
    dateFormat?: (date: Date) => string;
    badges?: NotificationItemBadge[];
    actions?: NotificationItemAction[];
    onClick?: React.EventHandler<React.MouseEvent>;
    children?: never;
    view?: 'user' | 'default';
    actionsMenuOpened?: boolean;
  },
  HTMLDivElement
>;
