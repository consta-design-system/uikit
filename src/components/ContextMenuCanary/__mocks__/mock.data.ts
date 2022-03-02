import { IconAllDone } from '../../../icons/IconAllDone/IconAllDone';
import { IconAttach } from '../../../icons/IconAttach/IconAttach';
import { IconBag } from '../../../icons/IconBag/IconBag';
import { IconEye } from '../../../icons/IconEye/IconEye';
import { IconSun } from '../../../icons/IconSun/IconSun';
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

export const exampleItems: ContextMenuItemDefault[] = [
  {
    label: 'Скрепка',
    leftIcon: IconAttach,
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
          },
        ],
      },
    ],
  },
  {
    label: 'Глаз',
    leftIcon: IconEye,
    groupId: 1,
  },
  {
    label: 'Две галочки',
    groupId: 2,
    leftIcon: IconAllDone,
    rightSide: '!',
    status: 'alert',
  },
  {
    label: 'Чемодан',
    groupId: 2,
    leftIcon: IconBag,
    rightSide: '!',
    status: 'alert',
  },
  {
    label: 'Солнце',
    groupId: 2,
    leftIcon: IconSun,
    status: 'alert',
    rightSide: '!',
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
