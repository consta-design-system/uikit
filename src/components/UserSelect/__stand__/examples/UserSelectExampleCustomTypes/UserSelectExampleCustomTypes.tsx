import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { UserSelect } from '../../../UserSelect';

export function UserSelectExampleCustomTypes() {
  const [value, setValue] = useState<string | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={['Андрей Андреев', 'Егор Егоров', 'Михаил Михайлов']}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
      />
    </Example>
  );
}

// Example 2

const groups = ['Цирк', 'Центр полётов'];

type Item = {
  firstName: string;
  lastName: string;
  group: string;
};

const items: Item[] = [
  { firstName: 'Андрей', lastName: 'Андреев', group: 'Цирк' },
  { firstName: 'Егор', lastName: 'Егоров', group: 'Цирк' },
  { firstName: 'Михаил', lastName: 'Михайлов', group: 'Центр полётов' },
];

export function UserSelectExampleCustomTypesWithGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        items={items}
        groups={groups}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => `${item.firstName} ${item.lastName}`}
        getItemLabel={(item) => `${item.firstName} ${item.lastName}`}
        getItemGroupKey={(item) => item.group}
        getItemSubLabel={(item) => item.group}
        getGroupKey={(group) => group}
        getGroupLabel={(group) => group}
      />
    </Example>
  );
}
