import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationGroupAction = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: IconComponent;
};

export type NotificationGroupProps = PropsWithHTMLAttributesAndRef<
  {
    title?: string;
    actions?: NotificationGroupAction[];
  },
  HTMLDivElement
>;
