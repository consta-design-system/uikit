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
    rightIcon: IconDinosaur,
    rightSide: '12 000',
  },
  {
    label: 'Красный',
    groupId: 1,
    rightIcon: IconDinosaur,
    rightSide: '12 000',
  },
  {
    label: 'Жёлтый',
    groupId: 1,
    disabled: true,
  },
  {
    label: 'Зелёный',
    groupId: 1,
  },
  {
    label: 'Белый',
    groupId: 2,
    disabled: true,
    leftIcon: IconDinosaur,
  },
  {
    label: 'Серо-буро-малиновый',
    groupId: 2,
  },
  {
    label: 'Чёрный',
    groupId: 1,
    leftIcon: IconDinosaur,
    leftSide: <Badge size="s" label="согласован" />,
  },
  {
    label: 'В полоску',
    groupId: 3,
  },
  {
    label: 'В клетку',
    groupId: 3,
    leftIcon: IconCheck,
  },
  {
    label: 'Коричневый',
    groupId: 1,
  },
  {
    label: 'Фиолетовый',
    groupId: 2,
  },
  {
    label: 'Лиловый',
    groupId: 2,
  },
  {
    label: 'Серый',
    groupId: 1,
  },
  {
    label: 'В горошек',
    groupId: 3,
  },
  {
    label: 'Голубой',
    groupId: 1,
  },
  {
    label: 'Индиго',
    groupId: 2,
  },
  {
    label: 'Серебряный',
    groupId: 2,
  },
  {
    label: 'Золотой',
    groupId: 2,
  },
  {
    label: 'Оранжевый',
    groupId: 2,
  },
  {
    label: 'Бирюзовый',
    groupId: 2,
  },
  {
    label: 'В цветочек',
    groupId: 3,
  },
];
