import { IconProps } from '../../../icons/Icon/Icon';
import { IconAllDone } from '../../../icons/IconAllDone/IconAllDone';
import { IconAttach } from '../../../icons/IconAttach/IconAttach';
import { IconBag } from '../../../icons/IconBag/IconBag';
import { IconEye } from '../../../icons/IconEye/IconEye';
import { IconSun } from '../../../icons/IconSun/IconSun';
import { BadgePropStatus } from '../../Badge/Badge';
import { ContextMenuAccent } from '../helpers';

export const groups = [
  {
    name: 'Первая группа',
    id: 1,
  },
  {
    name: 'Вторая группа',
    id: 2,
  },
] as const;

export declare type Item = {
  name: string;
  group?: typeof groups[number]['id'];
  subMenu?: Item[];
  switch?: boolean;
  status?: BadgePropStatus;
  icon?: React.FC<IconProps> | null;
  accent?: ContextMenuAccent;
  disabled?: boolean;
};

export const exampleItems: Item[] = [
  {
    name: 'Скрепка',
    icon: IconAttach,
    accent: 'success',
    group: 1,
    subMenu: [
      {
        name: 'Пункт - 1',
        status: 'success',
        accent: 'success',
      },
      {
        name: 'Пункт - 2',
        accent: 'success',
        subMenu: [
          {
            name: 'Пункт - 3',
            icon: IconSun,
            subMenu: [
              {
                name: 'Пункт - 5',
              },
              {
                name: 'Пункт - 6',
              },
            ],
          },
          {
            name: 'Пункт - 4',
            icon: IconSun,
            subMenu: [
              {
                name: 'Пункт - 7',
              },
              {
                name: 'Пункт - 8',
              },
            ],
          },
          {
            name: 'Пункт - 9',
            icon: IconSun,
          },
        ],
      },
    ],
  },
  {
    name: 'Глаз',
    status: 'normal',
    icon: IconEye,
    accent: 'success',
    group: 1,
  },
  {
    name: 'Две галочки',
    group: 2,
    icon: IconAllDone,
    switch: false,
    accent: 'alert',
  },
  {
    name: 'Чемодан',
    group: 2,
    icon: IconBag,
    switch: false,
    accent: 'alert',
  },
  {
    name: 'Солнце',
    group: 2,
    icon: IconSun,
    switch: false,
    accent: 'alert',
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
