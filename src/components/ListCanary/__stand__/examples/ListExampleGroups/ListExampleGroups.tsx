import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';
import { Text } from '##/components/Text';

type Item = {
  label: string;
  id: number;
  groupId: number;
};

type Group = {
  label: string;
  id: number;
  rightSide?: React.ReactNode;
};

const groups: Group[] = [
  {
    id: 1,
    label: 'Первая группа',
    rightSide: (
      <Text view="brand" size="2xs">
        Все результаты
      </Text>
    ),
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

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
    groupId: 1,
  },
  {
    label: 'Второй',
    id: 2,
    groupId: 2,
  },
  {
    label: 'Третий',
    id: 3,
    groupId: 1,
  },
  {
    label: 'Четвертый',
    id: 4,
    groupId: 3,
  },
  {
    label: 'Пятый',
    id: 5,
    groupId: 2,
  },
];

export const ListExampleGroups = () => {
  return (
    <Example>
      <List
        items={items}
        groups={groups}
        onItemClick={(item) => alert(item.label)}
      />
    </Example>
  );
};
