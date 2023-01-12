import './UserSelectExampleRenderItem.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Badge } from '../../../../Badge/Badge';
import { User } from '../../../../User/User';
import { UserSelect } from '../../../UserSelect';

const cnUserSelectExampleRenderItem = cn('UserSelectExampleRenderItem');

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

export const searchCompare = (
  searchValue: string,
  compare?: string,
): boolean => {
  if (!compare) {
    return false;
  }

  return (
    compare.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
  );
};

const searchFunction = (item: Item, searchValue: string): boolean => {
  const searchOfLabel = searchCompare(searchValue, item.label);

  if (searchOfLabel) {
    return searchOfLabel;
  }

  const searchOfSubLabel = searchCompare(searchValue, item.subLabel);

  if (searchOfSubLabel) {
    return searchOfSubLabel;
  }

  return searchCompare(searchValue, item.status && mapLabel[item.status]);
};

export function UserSelectExampleRenderItem() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        searchFunction={searchFunction}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnUserSelectExampleRenderItem('Item', {
              active,
              hovered,
            })}
            role="option"
            aria-selected={active}
            aria-hidden
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            <User
              className={cnUserSelectExampleRenderItem('User')}
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
