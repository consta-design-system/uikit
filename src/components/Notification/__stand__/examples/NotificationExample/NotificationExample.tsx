import { IconEye } from '@consta/icons/IconEye';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { Notification, NotificationDefaultItem } from '../../..';

const emptyFunction = (e: React.MouseEvent) => {};

export const items: NotificationDefaultItem[] = [
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    caption: 'Меньше минуты назад',
    read: true,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    caption: 'Меньше минуты назад',
    read: true,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    read: false,
    actions: [
      {
        label: 'Удалить',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Отметить как прочитанное',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
];

export const NotificationExample = () => (
  <Example col={1}>
    <Notification items={items} getItemUserName={(item) => item.label} />
  </Example>
);
