import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleView = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          view="primary"
          name="ChoiceGroupExampleView"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          view="ghost"
          name="ChoiceGroupExampleView"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          view="secondary"
          name="ChoiceGroupExampleView"
        />
      </div>
    </StoryBookExample>
  );
};
