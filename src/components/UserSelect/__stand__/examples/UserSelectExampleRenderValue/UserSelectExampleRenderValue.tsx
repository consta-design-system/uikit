import './UserSelectExampleRenderValue.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Badge } from '../../../../Badge/Badge';
import { User } from '../../../../User/User';
import { UserSelect } from '../../../UserSelect';

const cnUserSelectExampleRenderValue = cn('UserSelectExampleRenderValue');

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
  status: 'remotely' | 'inOffice';
};

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
    status: 'remotely',
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
    status: 'remotely',
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
    status: 'inOffice',
  },
];

const mapLabel = {
  remotely: 'Удаленно',
  inOffice: 'В офисе',
} as const;

const mapStatus = {
  remotely: 'normal',
  inOffice: 'success',
} as const;

export function UserSelectExampleRenderValue() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        renderValue={({ item }) => (
          <div className={cnUserSelectExampleRenderValue('Item')}>
            <User
              className={cnUserSelectExampleRenderValue('User')}
              name={item.label}
              avatarUrl={item.avatarUrl}
              info={item.subLabel}
            />
            <Badge
              status={mapStatus[item.status]}
              label={mapLabel[item.status]}
              size="s"
            />
          </div>
        )}
      />
    </Example>
  );
}
