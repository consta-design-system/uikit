import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tabs } from '../../../Tabs';

const items = ['Таб номер один', 'Таб номер два', 'Таб номер три'];

export const TabsExampleFitModeScroll = () => {
  const [value, setValue] = useState(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div style={{ width: 250 }}>
        <Tabs
          fitMode="scroll"
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
        />
      </div>
    </StoryBookExample>
  );
};
