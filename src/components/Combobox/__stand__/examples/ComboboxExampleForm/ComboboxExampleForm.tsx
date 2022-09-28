import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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

export function ComboboxExampleForm() {
  const [value, setValue] = useState<Item | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        placeholder="Форма round"
        form="round"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Combobox
        placeholder="Форма defaultBrick"
        form="defaultBrick"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
}
