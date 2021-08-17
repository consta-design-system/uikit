import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

const items = ['Таб номер один', 'Таб номер два', 'Таб номер три'];

export const TabsExampleFitModeDropdown = () => {
  const [value, setValue] = useState(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      {[300, 200, 100].map((width) => (
        <div key={width} style={{ width }}>
          <Tabs
            fitMode="dropdown"
            value={value}
            onChange={({ value }) => setValue(value)}
            items={items}
            getLabel={(item) => item}
          />
        </div>
      ))}
    </StoryBookExample>
  );
};
