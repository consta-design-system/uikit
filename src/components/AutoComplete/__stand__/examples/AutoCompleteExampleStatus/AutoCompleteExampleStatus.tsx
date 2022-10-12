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
export const AutoCompleteExampleStatus = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        placeholder="default"
        caption="default"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        value={value}
        items={items}
        placeholder="alert"
        caption="alert"
        status="alert"
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        value={value}
        items={items}
        placeholder="warning"
        caption="warning"
        status="warning"
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        value={value}
        items={items}
        placeholder="success"
        caption="success"
        status="success"
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
