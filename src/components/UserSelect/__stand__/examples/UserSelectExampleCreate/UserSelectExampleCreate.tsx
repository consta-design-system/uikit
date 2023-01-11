import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { UserSelect } from '../../../UserSelect';

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
};

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
  },
];

export function UserSelectExampleCreate() {
  const [value, setValue] = useState<Item | null>();
  const [list, setList] = useState<Item[]>(items);
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={list}
        value={value}
        onChange={({ value }) => setValue(value)}
        onCreate={({ label }) =>
          setList([{ label, id: `${label}_${list.length + 1}` }, ...list])
        }
      />
    </Example>
  );
}

export function UserSelectExampleCreateCustomLabel() {
  const [value, setValue] = useState<Item | null>();
  const [list, setList] = useState<Item[]>(items);
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={list}
        value={value}
        onChange={({ value }) => setValue(value)}
        onCreate={({ label }) =>
          setList([{ label, id: `${label}_${list.length + 1}` }, ...list])
        }
        labelForCreate="Добавить"
      />
    </Example>
  );
}
