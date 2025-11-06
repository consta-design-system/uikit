import { IconEye } from '@consta/icons/IconEye';
import { IconTrash } from '@consta/icons/IconTrash';

// import Image1 from '##/images/Arhayka.image.jpeg';
// import Image from '##/images/Gizeasy.image.jpeg';
import { NotificationItemAction } from '../NotificationItem';
import {
  NotificationListDefaultGroup,
  NotificationListDefaultItem,
} from '../NotificationList';

const emptyFunction = () => {};

export const items: NotificationListDefaultItem[] = [
  {
    label: 'Иванов Иван Иванович',
    description: 'Добавил файлы в проект, план/факт по расчету предварительные',
    // image: Image,
    date: new Date(2021, 10, 12, 13, 57, 0),
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
    onClick: emptyFunction,
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
    view: 'user',
    group: 'd',
  },
  {
    label: 'Иванов Иван Иванович',
    description: 'Добавил файлы в проект, план/факт по расчету предварительные',
    // image: Image,
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
    onClick: emptyFunction,
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
    view: 'user',
  },
  {
    label: 'Иванов Иван Иванович',
    description: 'Добавил файлы в проект, план/факт по расчету предварительные',
    // image: Image,
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
    onClick: emptyFunction,
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
    view: 'user',
  },
];

export const itemsBadges: NotificationListDefaultItem[] = [
  {
    label: 'Один человек',
    description: 'Принёс краску',
    // image: Image,
    badges: [
      {
        label: 'готов к работе',
        status: 'warning',
      },
      {
        label: 'горит',
        status: 'error',
      },
    ],
  },
  {
    label: 'Другой человек',
    description: 'Покрасил забор',
    // image: Image1,
    badges: [
      {
        label: 'покрашен',
        status: 'success',
      },
    ],
  },
];

export const itemsBasic: NotificationListDefaultItem[] = [
  {
    label: 'Один человек',
    description: 'Принёс краску',
    // image: Image,
  },
  {
    label: 'Другой человек',
    description: 'Покрасил забор',
    // image: Image1,
  },
];

export const itemsView: NotificationListDefaultItem[] = [
  {
    label: 'Иванов Иван Иванович',
    description: 'Принёс краску',
    view: 'default',
  },
  {
    label: 'Петров Петр Петрович',
    description: 'Покрасил забор',
    view: 'user',
  },
];

export const itemsActions: NotificationListDefaultItem[] = [
  {
    label: 'Иванов Иван Иванович',
    description: 'Принёс краску',
    // image: Image1,
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
    label: 'Петров Петр Петрович',
    description: 'Покрасил забор',
    // image: Image,
    actions: [
      {
        label: 'Положить в корзину',
        onClick: emptyFunction,
        icon: IconTrash,
      },
      {
        label: 'Я посмотрел',
        onClick: emptyFunction,
        icon: IconEye,
      },
    ],
  },
];

export const itemsRead: NotificationListDefaultItem[] = [
  {
    label: 'Прочитанное уведомление',
    description: 'Принёс краску',
    // image: Image,
    read: true,
  },
  {
    label: 'Непрочитанное уведомление',
    description: 'Покрасил забор',
    // image: Image1,
    read: false,
  },
];

export const itemsDate: NotificationListDefaultItem[] = [
  {
    label: 'Первое уведомление',
    description: 'Привет, мир',
    // image: Image,
    date: new Date(2021, 10, 12, 13, 57, 0),
  },
  {
    label: 'Второе уведомление',
    description: 'Пока-пока',
    // image: Image1,
    date: new Date(2021, 10, 12, 13, 57, 0),
  },
  {
    label: 'Третее уведомление',
    description: 'Пока-пока',
    // image: Image1,
    date: new Date(),
  },
  {
    label: 'Четвёртое уведомление',
    description: 'Пока-пока',
    // image: Image1,
    date: new Date(),
  },
];

export const actions: NotificationItemAction[] = [
  {
    label: 'Отметить все как прочитанное',
    onClick: emptyFunction,
    icon: IconEye,
  },
  {
    label: 'Удалить все',
    onClick: emptyFunction,
    icon: IconTrash,
  },
];

export const groups: NotificationListDefaultGroup[] = [
  {
    label: 'важное',
    id: 'important',
  },
  {
    label: 'неважное',
    id: 'not',
  },
];

export const itemsGroups: NotificationListDefaultItem[] = [
  {
    label: 'Первое уведомление',
    description: 'Привет, мир',
    // image: Image,
    group: 'important',
  },
  {
    label: 'Второе уведомление',
    description: 'Пока-пока',
    // image: Image1,
    group: 'not',
  },
  {
    label: 'Третее уведомление',
    description: 'Пока-пока',
    // image: Image1,
    group: 'not',
  },
  {
    label: 'Четвёртое уведомление',
    description: 'Пока-пока',
    // image: Image1,
    group: 'important',
  },
];
