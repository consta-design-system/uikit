import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

export const TabsExampleSize = () => {
  type Item = string;
  const items: Item[] = ['один', 'два', 'три'];
  const [value, setValue] = useState<Item[] | null>(['три']);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        size="m"
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        size="s"
      />
    </StoryBookExample>
  );
};
