import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cnTabsTab, Tabs } from '../../../Tabs';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const TabsExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        size="m"
        renderItem={({ className, ref, label, onChange, key }) => (
          <button
            key={key}
            type="button"
            onClick={onChange}
            ref={ref}
            className={cnTabsTab(null, [className])}
          >
            <span style={{ marginRight: 4 }} role="img" aria-label="img">
              🤘
            </span>
            {label}
          </button>
        )}
      />
    </StoryBookExample>
  );
};
