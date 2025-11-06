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
    read: true,
  },
  {
    title: 'Петров Петр Петрович',
    description: 'Покрасил забор',
    read: false,
  },
];

export const NotificationItemExampleRead = () => {
  return (
    <Example
      items={items}
      col={2}
      getItemDescription={(item) => `read="${item.read ? 'true' : 'false'}"`}
      getItemNode={(item) => <NotificationItem {...item} />}
    />
  );
};
