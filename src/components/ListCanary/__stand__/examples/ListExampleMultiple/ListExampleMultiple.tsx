import React, { useState } from 'react';

import { List } from '##/components/ListCanary';
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

export const ListExampleMultiple = () => {
  const [value, setValue] = useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        items={items}
        multiple
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
