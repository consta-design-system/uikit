import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoCompleteCanary/AutoCompleteCanary';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

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

export const AutoCompleteExampleSize = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        placeholder="Размер xs"
        size="xs"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        placeholder="Размер s"
        value={value}
        items={items}
        size="s"
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        placeholder="Размер m"
        value={value}
        items={items}
        size="m"
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        placeholder="Размер l"
        value={value}
        items={items}
        size="l"
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
