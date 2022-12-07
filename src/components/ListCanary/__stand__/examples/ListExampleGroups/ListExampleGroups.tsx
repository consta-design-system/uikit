import React, { useState } from 'react';

import { List } from '##/components/ListCanary';
import { Text } from '##/components/Text';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

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
  const [value, setValue] = useState<Item | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        value={value}
        items={items}
        groups={groups}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
