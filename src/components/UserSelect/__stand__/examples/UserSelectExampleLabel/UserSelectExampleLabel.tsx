import { IconUser } from '@consta/icons/IconUser';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import avatarUrl from '../../../__mocks__/avatar_1.jpg';
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
    avatarUrl,
    id: 3,
  },
];

export function UserSelectExampleLabel() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        label="Пользователь"
        caption={value?.label}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите пользователя"
      />
    </Example>
  );
}

export function UserSelectExampleLabelIcon() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        label="Пользователь"
        labelIcon={IconUser}
        caption={value?.label}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите пользователя"
      />
    </Example>
  );
}

export function UserSelectExampleLabelPosition() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Здесь лейбл сверху"
        label="Лейбл"
        labelPosition="top"
      />
      <UserSelect
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Здесь лейбл слева"
        label="Лейбл"
        labelPosition="left"
      />
    </Example>
  );
}
