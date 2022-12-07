import React from 'react';

import { Badge } from '##/components/Badge';
import { IconCheck } from '##/icons/IconCheck';
import { IconDinosaur } from '##/icons/IconDinosaur';

import { DefaultListGroup, DefaultListItem } from '../types';

export const groups: DefaultListGroup[] = [
  {
    id: 1,
    label: 'Первая группа',
  },
  {
    id: 2,
    label: 'Вторая группа',
  },
  {
    id: 3,
    label: 'Третья группа',
  },
];

export const basicItems: DefaultListItem[] = [
  {
    label: 'Синий',
    groupId: 1,
    id: 1,
    rightIcon: IconDinosaur,
    rightSide: '12 000',
  },
  {
    label: 'Красный',
    groupId: 1,
    id: 2,
    rightIcon: IconDinosaur,
    rightSide: '12 000',
  },
  {
    label: 'Жёлтый',
    groupId: 1,
    id: 3,
    disabled: true,
  },
  {
    label: 'Зелёный',
    groupId: 1,
    id: 4,
  },
  {
    label: 'Белый',
    groupId: 2,
    id: 5,
    disabled: true,
    leftIcon: IconDinosaur,
  },
  {
    label: 'Серо-буро-малиновый',
    groupId: 2,
    id: 6,
  },
  {
    label: 'Чёрный',
    groupId: 1,
    id: 7,
    leftIcon: IconDinosaur,
    leftSide: <Badge size="s" label="согласован" />,
  },
  {
    label: 'В полоску',
    groupId: 3,
    id: 8,
  },
  {
    label: 'В клетку',
    groupId: 3,
    leftIcon: IconCheck,
    id: 9,
  },
  {
    label: 'Коричневый',
    groupId: 1,
    id: 10,
  },
  {
    label: 'Фиолетовый',
    groupId: 2,
    id: 11,
  },
  {
    label: 'Лиловый',
    groupId: 2,
    id: 12,
  },
  {
    label: 'Серый',
    groupId: 1,
    id: 13,
  },
  {
    label: 'В горошек',
    groupId: 3,
    id: 14,
  },
  {
    label: 'Голубой',
    groupId: 1,
    id: 15,
  },
  {
    label: 'Индиго',
    groupId: 2,
    id: 16,
  },
  {
    label: 'Серебряный',
    groupId: 2,
    id: 17,
  },
  {
    label: 'Золотой',
    groupId: 2,
    id: 18,
  },
  {
    label: 'Оранжевый',
    groupId: 2,
    id: 19,
  },
  {
    label: 'Бирюзовый',
    groupId: 2,
    id: 20,
  },
  {
    label: 'В цветочек',
    groupId: 3,
    id: 21,
  },
];
