import React, { useState } from 'react';

import { getMailItems } from '##/components/AutoComplete/__mocks__/data.mock';
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
export const AutoCompleteExampleType = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="textarea"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};

export const AutoCompleteExampleTypeEmail = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="email"
        value={value}
        items={getMailItems(value)}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
