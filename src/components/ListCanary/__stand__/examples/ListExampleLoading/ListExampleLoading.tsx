import React, { useState } from 'react';

import { List } from '##/components/ListCanary';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';

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
export const ListExampleLoading = () => {
  const [value, setValue] = useState<Item | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        isLoading
      />
      <List
        value={value}
        onChange={({ value }) => setValue(value)}
        items={[] as Item[]}
        isLoading
      />
    </StoryBookExample>
  );
};
