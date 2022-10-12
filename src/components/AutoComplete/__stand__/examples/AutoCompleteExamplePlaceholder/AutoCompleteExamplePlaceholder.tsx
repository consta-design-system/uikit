import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoComplete/AutoComplete';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';

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

export const AutoCompleteExamplePlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        placeholder="Введите значение"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
