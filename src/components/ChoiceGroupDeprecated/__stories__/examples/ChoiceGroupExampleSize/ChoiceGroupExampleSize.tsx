import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleSize = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          size="xs"
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          size="s"
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          size="m"
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          size="l"
          name="ChoiceGroupExampleSize"
        />
      </div>
    </StoryBookExample>
  );
};
