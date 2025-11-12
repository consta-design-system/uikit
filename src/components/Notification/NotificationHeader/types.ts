import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationHeaderAction = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: IconComponent;
};

export type NotificationHeaderProps = PropsWithHTMLAttributesAndRef<
  {
    title?: string;
    actions?: NotificationHeaderAction[];
    onClose?: React.EventHandler<React.MouseEvent>;
    scrollContainerRef?: React.RefObject<HTMLDivElement>;
  },
  HTMLDivElement
>;
