import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';

type Item = {
  label: string;
  groupId?: number;
};

type Group = {
  label?: string;
  id: number;
  rightSide?: React.ReactNode;
};

const groups: Group[] = [
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

const items: Item[] = [
  {
    label: 'Первый',
    groupId: 1,
  },
  {
    label: 'Второй',
    groupId: 2,
  },
  {
    label: 'Третий',
    groupId: 1,
  },
  {
    label: 'Четвертый',
    groupId: 3,
  },
  {
    label: 'Пятый',
    groupId: 2,
  },
];

export const ListExampleSpace = () => {
  return (
    <Example
      col={{ 1: 0, 3: 700 }}
      separately
      items={[
        {
          label: 'Без отступов',
          node: (
            <List
              items={items}
              groups={groups}
              onItemClick={(item) => alert(item.label)}
              itemSpase={{}}
              groupLabelSpase={{}}
              dividerSpase={{}}
            />
          ),
        },
        {
          label: 'С кастомными отступами, без заголовков групп',
          node: (
            <List
              items={items}
              groups={groups}
              onItemClick={(item) => alert(item.label)}
              itemSpase={{ p: 's' }}
              dividerSpase={{ mH: 's' }}
              getGroupLabel={() => undefined}
            />
          ),
        },
        {
          label: 'С кастомными отступами, с заголовками групп',
          node: (
            <List
              items={items}
              groups={groups}
              onItemClick={(item) => alert(item.label)}
              itemSpase={{ p: 's' }}
              groupLabelSpase={{ mH: 's', pT: 's', pB: '2xs' }}
            />
          ),
        },
      ]}
    />
  );
};
