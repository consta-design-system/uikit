import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleForm = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          form="default"
          name="ChoiceGroupExampleForm"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          form="brick"
          name="ChoiceGroupExampleForm"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          form="round"
          name="ChoiceGroupExampleForm"
        />
      </div>
    </StoryBookExample>
  );
};
