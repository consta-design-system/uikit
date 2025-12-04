import { IconEye } from '@consta/icons/IconEye';
import { IconTrash } from '@consta/icons/IconTrash';

import { BadgePropStatus } from '##/components/Badge';

import { NotificationDefaultItem } from '../index';

const emptyFunction = () => {};

export const items: (NotificationDefaultItem & {
  date: Date;
  badges: {
    label: string;
    status: BadgePropStatus;
  }[];
})[] = [
  {
    label: 'Иванов Иван Иванович',
    content: 'Добавил файлы в проект, план/факт по расчету предварительные',
    date: new Date(),
    read: true,
    badges: [
      {
        label: 'отчеты 1',
        status: 'normal',
      },
      {
        label: 'файлы 2',
        status: 'warning',
      },
      {
        label: 'система 3',
        status: 'success',
      },
      {
        label: 'отчеты 4',
        status: 'normal',
      },
      {
        label: 'файлы 5',
        status: 'warning',
      },
      {
        label: 'система 6',
        status: 'success',
      },
    ],

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
    date: new Date(),
    read: true,
    badges: [
      {
        label: 'отчеты 1',
        status: 'normal',
      },
      {
        label: 'файлы 2',
        status: 'warning',
      },
      {
        label: 'система 3',
        status: 'success',
      },
      {
        label: 'отчеты 4',
        status: 'normal',
      },
      {
        label: 'файлы 5',
        status: 'warning',
      },
      {
        label: 'система 6',
        status: 'success',
      },
    ],

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
    date: new Date(2025, 10, 12, 13, 57, 0),
    read: false,
    badges: [
      {
        label: 'отчеты 1',
        status: 'normal',
      },
      {
        label: 'файлы 2',
        status: 'warning',
      },
      {
        label: 'система 3',
        status: 'success',
      },
      {
        label: 'отчеты 4',
        status: 'normal',
      },
      {
        label: 'файлы 5',
        status: 'warning',
      },
      {
        label: 'система 6',
        status: 'success',
      },
    ],

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
