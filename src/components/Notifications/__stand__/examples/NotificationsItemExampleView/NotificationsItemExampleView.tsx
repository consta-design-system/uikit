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
    view: 'default',
  },
  {
    title: 'Петров Петр Петрович',
    description: 'Покрасил забор',
    view: 'user',
  },
];

export const NotificationsItemExampleView = () => {
  return (
    <Example
      items={items}
      col={2}
      getItemDescription={(item) => `view="${item.view}"`}
      getItemNode={(item) => <NotificationsItem {...item} />}
    />
  );
};
