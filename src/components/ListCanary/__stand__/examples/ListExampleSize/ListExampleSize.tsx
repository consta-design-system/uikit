import './ListExampleSize.css';

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

const cnListExampleSize = cn('ListExampleSize');

export const ListExampleSize = () => {
  const [value, setValue] = useState<Item | null>(null);
  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
        cnListExampleSize(),
      ])}
    >
      <div>
        <Text>xs</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          size="xs"
        />
      </div>
      <div>
        <Text>s</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          size="s"
        />
      </div>
      <div>
        <Text>m</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          size="m"
        />
      </div>
      <div>
        <Text>l</Text>
        <List
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          size="l"
        />
      </div>
    </StoryBookExample>
  );
};
