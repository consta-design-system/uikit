import { Example } from '@consta/stand';
import React from 'react';

import {
  NotificationsItem,
  NotificationsItemProps,
} from '##/components/Notifications/NotificationsItem';

const items: NotificationsItemProps[] = [
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

export const NotificationsItemExampleRead = () => {
  return (
    <Example
      items={items}
      col={2}
      getItemDescription={(item) => `read="${item.read ? 'true' : 'false'}"`}
      getItemNode={(item) => <NotificationsItem {...item} />}
    />
  );
};
