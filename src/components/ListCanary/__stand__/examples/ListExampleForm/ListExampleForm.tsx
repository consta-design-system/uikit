import './ListExampleForm.css';

import React, { useState } from 'react';

import { List } from '##/components/ListCanary';
import { Text } from '##/components/Text';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';

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

const cnListExampleForm = cn('ListExampleForm');

export const ListExampleForm = () => {
  const [value, setValue] = useState<Item | null>(null);
  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnListExampleForm(),
      ])}
    >
      <div>
        <Text>default</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          form="default"
        />
      </div>
      <div>
        <Text>round</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          form="round"
        />
      </div>
      <div>
        <Text>brick</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          form="brick"
        />
      </div>
    </StoryBookExample>
  );
};
