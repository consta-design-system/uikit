import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Select } from '../../../Select';

export function SelectExampleCustomTypes() {
  const [value, setValue] = useState<string | null>();
  return (
    <div className={cnDocsDecorator('Section', { indent: 'bottom' })}>
      <Select<string>
        placeholder="Выберите значение"
        items={['Первый', 'Второй', 'Третий']}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item: string) => item}
        getItemLabel={(item: string) => item}
        getItemGroupKey={() => undefined}
        getItemDisabled={() => undefined}
      />
    </div>
  );
}

// Example 2

export type Item = {
  name: string;
  group: string;
};

export const items: Item[] = [
  { name: 'Первый', group: 'Первая группа' },
  { name: 'Второй', group: 'Третья группа' },
  { name: 'Третий', group: 'Вторая группа' },
  { name: 'Четвертый', group: 'Первая группа' },
  { name: 'Пятый', group: 'Первая группа' },
  { name: 'Шестой', group: 'Третья группа' },
  { name: 'Седьмой', group: 'Первая группа' },
  { name: 'Восьмой', group: 'Вторая группа' },
  { name: 'Девятый', group: 'Третья группа' },
  { name: 'Десятый', group: 'Вторая группа' },
];

export const groups: string[] = ['Первая группа', 'Вторая группа', 'Третья группа'];

export function SelectExampleCustomTypesWithGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <Select<Item, string>
        placeholder="Выберите значение"
        items={items}
        groups={groups}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        getItemGroupKey={(item) => item.group}
        getItemDisabled={() => undefined}
        getGroupKey={(group) => group}
        getGroupLabel={(group) => group}
      />
    </div>
  );
}
