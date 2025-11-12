import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import {
  defaultDateFormat,
  groupLabelByDay,
  groupsByDay,
  Notification,
  NotificationDefaultGroup,
  sortGroupByDay,
} from '../../..';

const emptyFunction = (e: React.MouseEvent) => {};

type Item = {
  label: string;
  date: Date;
  read?: boolean;
  content: string;
};

export const items: Item[] = [
  {
    label: 'Иванов Иван Иванович',
    date: new Date(),
    read: true,
    content: 'Добавил файлы в проект',
  },
  {
    label: 'Иванов Иван Иванович',
    date: new Date(),
    read: true,
    content: 'Исправил документы',
  },
  {
    label: 'Иванов Иван Иванович',
    date: new Date(2025, 10, 12, 13, 57, 0),
    read: false,
    content: 'Отправил расчеты',
  },
];

export const NotificationExampleGroupsByDay = () => (
  <Example col={1}>
    <Notification
      items={items}
      getItemGroup={({ date }) => groupsByDay(date)}
      getGroupLabel={({ key }) => groupLabelByDay(key)}
      getItemCaption={(item) => defaultDateFormat(item.date)}
      getItemUserName={(item) => item.label}
      getItemActions={() => [
        {
          label: 'Прочитать',
          onClick: emptyFunction,
          icon: IconAllDone,
        },
        { label: 'Удалить', onClick: emptyFunction, icon: IconTrash },
      ]}
      sortGroups={sortGroupByDay}
      getGroupActions={() => [
        {
          label: 'Прочитать всё',
          onClick: () => {},
          icon: IconAllDone,
        },
        { label: 'Удалить всё', onClick: emptyFunction, icon: IconTrash },
      ]}
    />
  </Example>
);

export const NotificationExampleGroupByRead = () => (
  <Example col={1}>
    <Notification
      items={items}
      getItemGroup={({ read }) => (read ? 'read' : 'not-read')}
      getGroupLabel={({ key }) =>
        key === 'read' ? 'Прочитанные' : 'Непрочитанные'
      }
      getItemCaption={(item) => defaultDateFormat(item.date)}
      getItemUserName={(item) => item.label}
      getItemRead={() => undefined}
      getItemActions={() => [
        {
          label: 'Прочитать',
          onClick: emptyFunction,
          icon: IconAllDone,
        },
        { label: 'Удалить', onClick: emptyFunction, icon: IconTrash },
      ]}
      sortGroups={sortGroupByDay}
      getGroupActions={() => [
        {
          label: 'Прочитать всё',
          onClick: () => {},
          icon: IconAllDone,
        },
        { label: 'Удалить всё', onClick: emptyFunction, icon: IconTrash },
      ]}
    />
  </Example>
);

const itemsWithGroups = [
  {
    label: 'Иванов Иван Иванович',
    date: new Date(),
    read: true,
    content: 'Добавил файлы в проект',
    group: '1',
  },
  {
    label: 'Иванов Иван Иванович',
    date: new Date(),
    read: true,
    content: 'Отправил расчеты',
    group: '1',
  },
  {
    label: 'Иванов Иван Иванович',
    date: new Date(),
    read: false,
    content: 'Отправил расчеты',
    group: '2',
  },
];

const groups: NotificationDefaultGroup[] = [
  {
    id: '1',
    label: 'Важные',
    actions: [
      {
        label: 'Прочитать всю группу',
        onClick: emptyFunction,
        icon: IconAllDone,
      },
      { label: 'Удалить всю группу', onClick: emptyFunction, icon: IconTrash },
    ],
  },
  {
    id: '2',
    label: 'Неважные',
    actions: [
      {
        label: 'Прочитать всю группу',
        onClick: emptyFunction,
        icon: IconAllDone,
      },
      { label: 'Удалить всю группу', onClick: emptyFunction, icon: IconTrash },
    ],
  },
];

export const NotificationExampleGroups = () => (
  <Example col={1}>
    <Notification
      items={itemsWithGroups}
      groups={groups}
      getItemCaption={(item) => defaultDateFormat(item.date)}
      getItemUserName={(item) => item.label}
      getItemActions={() => [
        {
          label: 'Прочитать',
          onClick: emptyFunction,
          icon: IconAllDone,
        },
        { label: 'Удалить', onClick: emptyFunction, icon: IconTrash },
      ]}
      getGroupActions={() => [
        {
          label: 'Прочитать всё',
          onClick: () => {},
          icon: IconAllDone,
        },
        { label: 'Удалить всё', onClick: emptyFunction, icon: IconTrash },
      ]}
    />
  </Example>
);
