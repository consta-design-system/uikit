import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { UserSelect } from '../../../UserSelect';

export function UserSelectExampleCustomTypes() {
  const [value, setValue] = useState<string | null>();
  return (
    <div className={cnDocsDecorator('Section', { indent: 'bottom' })}>
      <UserSelect
        placeholder="Выберите значение"
        items={['Андрей Андреев', 'Егор Егоров', 'Михаил Михайлов']}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
      />
    </div>
  );
}

// Example 2

const groups = ['Отдел разработкки', 'Отдел закупок'];

type Item = {
  firstName: string;
  lastName: string;
  group: string;
};

const items: Item[] = [
  { firstName: 'Андрей', lastName: 'Андреев', group: 'Отдел разработкки' },
  { firstName: 'Егор', lastName: 'Егоров', group: 'Отдел разработкки' },
  { firstName: 'Михаил', lastName: 'Михайлов', group: 'Отдел закупок' },
];

export function UserSelectExampleCustomTypesWithGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <UserSelect
        placeholder="Выберите значение"
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
    </div>
  );
}
