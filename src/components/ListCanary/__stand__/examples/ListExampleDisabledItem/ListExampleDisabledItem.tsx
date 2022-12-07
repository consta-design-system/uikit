import React, { useState } from 'react';

import { List } from '##/components/ListCanary/ListCanary';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';

type Item = {
  label: string;
  id: number;
  disabled: boolean;
};

const items: Item[] = [
  {
    label: 'Первый — этот вариант не выбрать',
    id: 1,
    disabled: true,
  },
  {
    label: 'Второй',
    id: 2,
    disabled: false,
  },
  {
    label: 'Третий — и этот тоже не выбрать',
    id: 3,
    disabled: true,
  },
];

export const ListExampleDisabledItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
