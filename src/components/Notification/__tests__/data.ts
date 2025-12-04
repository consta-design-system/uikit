import { IconMock } from '##/../__mocks__/IconMock';

import { NotificationDefaultGroup, NotificationDefaultItem } from '..';

const emptyFunction = () => {};

export const defaultItems: NotificationDefaultItem[] = [
  {
    label: 'label 1',
    content: 'content 1',
    caption: 'caption 1',
    userName: 'userName 1',
    userImage: 'userImage 1',
    read: true,
    group: '1',
    actions: [
      {
        label: 'actions 1',
        onClick: emptyFunction,
        icon: IconMock,
      },
      {
        label: 'actions 2',
        onClick: emptyFunction,
        icon: IconMock,
      },
    ],
  },
  {
    label: 'label 2',
    content: 'content 2',
    caption: 'caption 2',
    userName: 'userName 2',
    userImage: 'userImage 2',
    read: false,
    group: '1',
    actions: [
      {
        label: 'actions 1',
        onClick: emptyFunction,
        icon: IconMock,
      },
      {
        label: 'actions 2',
        onClick: emptyFunction,
        icon: IconMock,
      },
    ],
  },
  {
    label: 'label 3',
    content: 'content 3',
    caption: 'caption 3',
    userName: 'userName 3',
    userImage: 'userImage 3',
    read: false,
    group: '2',
    actions: [
      {
        label: 'actions 1',
        onClick: emptyFunction,
        icon: IconMock,
      },
      {
        label: 'actions 2',
        onClick: emptyFunction,
        icon: IconMock,
      },
    ],
  },
];

export const defaultGroups: NotificationDefaultGroup[] = [
  {
    label: 'group 1',
    id: '1',
    actions: [
      {
        label: 'actions 1',
        onClick: emptyFunction,
        icon: IconMock,
      },
      {
        label: 'actions 2',
        onClick: emptyFunction,
        icon: IconMock,
      },
    ],
  },
  {
    label: 'group 2',
    id: '2',
    actions: [
      {
        label: 'actions 1',
        onClick: emptyFunction,
        icon: IconMock,
      },
      {
        label: 'actions 2',
        onClick: emptyFunction,
        icon: IconMock,
      },
    ],
  },
];

export const itemsWithDates: (NotificationDefaultItem & {
  date: Date;
})[] = [
  {
    label: 'label 1',
    content: 'content 1',
    caption: 'caption 1',
    date: new Date(),
    read: true,
  },
  {
    label: 'label 2',
    content: 'content 2',
    caption: 'caption 2',
    date: new Date(),
    read: false,
  },
  {
    label: 'label 3',
    content: 'content 3',
    caption: 'caption 3',
    date: new Date(2025, 10, 12, 13, 57, 0),
    read: false,
  },
];

export const itemsCustom: {
  name: string;
  date: Date;
  actions: { delete: true; read: true };
  isRead: boolean;
  message: string;
}[] = [
  {
    name: 'name 1',
    message: 'message 1',
    date: new Date(),
    isRead: true,
    actions: { delete: true, read: true },
  },
  {
    name: 'name 2',
    message: 'message 2',
    date: new Date(),
    isRead: false,
    actions: { delete: true, read: true },
  },
  {
    name: 'name 3',
    message: 'message 3',
    date: new Date(),
    isRead: false,
    actions: { delete: true, read: true },
  },
];
