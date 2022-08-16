import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../Combobox';

export function ComboboxExampleCustomTypes() {
  const [value, setValue] = useState<string | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section', { indent: 'bottom' })}>
      <Combobox
        placeholder="Выберите вариант"
        items={['Первый', 'Второй', 'Третий']}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
      />
    </StoryBookExample>
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

export function ComboboxExampleCustomTypesWithGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        groups={groups}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        getItemGroupKey={(item) => item.group}
        getGroupKey={(group: string) => group}
        getGroupLabel={(group: string) => group}
      />
    </StoryBookExample>
  );
}
