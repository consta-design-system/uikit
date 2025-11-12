import { IconProps } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationItemAction = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: React.FC<IconProps>;
};

export type NotificationItemProps = PropsWithHTMLAttributesAndRef<
  {
    title?: string;
    userName?: string;
    userImageUrl?: string;
    content?: React.ReactNode;
    caption?: React.ReactNode;
    actions?: NotificationItemAction[];
    children?: never;
    read?: boolean;
    scrollContainerRef?: React.RefObject<HTMLDivElement>;
  },
  HTMLDivElement
>;
