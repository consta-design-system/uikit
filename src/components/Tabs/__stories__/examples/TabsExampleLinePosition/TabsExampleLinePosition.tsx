import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs, tabsLinePositions } from '../../../Tabs';

type Item = string;

const items: Item[] = ['Первый', 'Второй', 'Третий'];

export const TabsExampleLinePosition = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <div>
      {tabsLinePositions.map((linePosition) => (
        <div key={linePosition} style={{ marginBottom: 'var(--space-l)' }}>
          <p>
            <code>linePosition=&quot;{linePosition}&quot;</code>
          </p>
          <StoryBookExample
            className={cnDocsDecorator('Section')}
            style={{ marginBottom: 'var(--space-xl)' }}
          >
            <Tabs
              value={value}
              onChange={({ value }) => setValue(value)}
              items={items}
              getLabel={(item) => item}
              linePosition={linePosition}
            />
          </StoryBookExample>
        </div>
      ))}
    </div>
  );
};
