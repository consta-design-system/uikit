import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

export const ExampleView = () => {
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
        view="bordered"
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        view="bordered"
      />
    </StoryBookExample>
  );
};
