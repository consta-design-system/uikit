import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs, tabsLinePositions } from '../../../Tabs';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const TabsExampleLinePosition = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <ul>
      {tabsLinePositions.map((linePosition) => (
        <li key={linePosition}>
          <code>linePosition=&quot;{linePosition}&quot;</code>
          <StoryBookExample className={cnDocsDecorator('Section')}>
            <Tabs
              value={value}
              onChange={({ value }) => setValue(value)}
              items={items}
              getLabel={(item) => item}
              linePosition={linePosition}
            />
          </StoryBookExample>
        </li>
      ))}
    </ul>
  );
};
