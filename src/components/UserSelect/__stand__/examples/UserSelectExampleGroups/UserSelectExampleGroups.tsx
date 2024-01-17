import { Example } from '@consta/stand';
import React, { useState } from 'react';

import avatarUrl from '../../../__mocks__/avatar_1.jpg';
import { UserSelect } from '../../../UserSelect';

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
  groupId: number;
};

type Group = {
  label: string;
  id: number;
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
];

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
    groupId: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
    groupId: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl,
    id: 3,
    groupId: 2,
  },
];

export function UserSelectExampleGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={items}
        value={value}
        onChange={setValue}
        groups={groups}
      />
    </Example>
  );
}
