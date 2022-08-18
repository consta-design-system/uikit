import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Combobox } from '../../../Combobox';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

export function ComboboxExampleOnInputChange() {
  const [value, setValue] = useState<Item | null>();
  const [search, setSearch] = useState<string | undefined | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Text size="l">Значение поиска: {search ?? 'Пусто'}</Text>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onInputChange={({ value }) => setSearch(value)}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
}
