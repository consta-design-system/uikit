import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconAttach } from '@consta/icons/IconAttach';
import { IconBag } from '@consta/icons/IconBag';
import { IconEye } from '@consta/icons/IconEye';
import { IconSun } from '@consta/icons/IconSun';

import { ContextMenuGroupDefault, ContextMenuItemDefault } from '../types';

export const groups: ContextMenuGroupDefault[] = [
  {
    label: 'Первая группа',
    id: 1,
  },
  {
    label: 'Вторая группа',
    id: 2,
  },
];

export type Item = ContextMenuItemDefault & {
  switch?: boolean;
};

export const exampleItems: Item[] = [
  {
    label: 'Скрепка',
    leftIcon: IconAttach,
    rightIcon: IconAttach,
    status: 'success',
    groupId: 1,
    subMenu: [
      {
        label: 'Пункт - 1',
        status: 'success',
      },
      {
        label: 'Пункт - 2',
        status: 'success',
        subMenu: [
          {
            label: 'Пункт - 3',
            leftIcon: IconSun,
            rightIcon: IconSun,
            subMenu: [
              {
                label: 'Пункт - 5',
              },
              {
                label: 'Пункт - 6',
              },
            ],
          },
          {
            label: 'Пункт - 4',
            leftIcon: IconSun,
            rightIcon: IconSun,
            subMenu: [
              {
                label: 'Пункт - 7',
              },
              {
                label: 'Пункт - 8',
              },
            ],
          },
          {
            label: 'Пункт - 9',
            leftIcon: IconSun,
            rightIcon: IconSun,
          },
        ],
      },
    ],
  },
  {
    label: 'Глаз',
    leftIcon: IconEye,
    rightIcon: IconEye,
    groupId: 1,
  },
  {
    label: 'Две галочки',
    groupId: 2,
    leftIcon: IconAllDone,
    rightIcon: IconAllDone,
    rightSide: '!',
    switch: true,
    status: 'alert',
  },
  {
    label: 'Чемодан',
    groupId: 2,
    leftIcon: IconBag,
    rightIcon: IconBag,
    rightSide: '!',
    switch: true,
    status: 'alert',
  },
  {
    label: 'Солнце',
    groupId: 2,
    leftIcon: IconSun,
    rightIcon: IconSun,
    status: 'alert',
    rightSide: '!',
    switch: true,
    disabled: true,
  },
];

export type TestItem = {
  name: string;
  group?: typeof groups[number]['id'];
};

export const testItems: TestItem[] = [
  {
    name: 'Скрепка',
    group: 2,
  },
  {
    name: 'Глаз',
    group: 1,
  },
  {
    name: 'Две галочки',
    group: 1,
  },
  {
    name: 'Чемодан',
    group: 2,
  },
  {
    name: 'Солнце',
    group: 2,
  },
];
