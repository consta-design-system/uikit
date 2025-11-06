import { Example } from '@consta/stand';
import React from 'react';

import {
  NotificationItem,
  NotificationItemProps,
} from '##/components/Notification/NotificationItem';

const items: NotificationItemProps[] = [
  {
    title: 'Иванов Иван Иванович',
    description: 'Принёс краску',
    view: 'default',
  },
  {
    title: 'Петров Петр Петрович',
    description: 'Покрасил забор',
    view: 'user',
  },
];

export const NotificationItemExampleView = () => {
  return (
    <Example
      items={items}
      col={2}
      getItemDescription={(item) => `view="${item.view}"`}
      getItemNode={(item) => <NotificationItem {...item} />}
    />
  );
};
