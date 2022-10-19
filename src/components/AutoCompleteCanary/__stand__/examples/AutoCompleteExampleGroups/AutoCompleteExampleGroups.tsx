import React, { useState } from 'react';

import {
  groups,
  items,
} from '##/components/AutoCompleteCanary/__mocks__/data.mock';
import { AutoComplete } from '##/components/AutoCompleteCanary/AutoCompleteCanary';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

export const AutoCompleteExampleGroups = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        placeholder="Начните вводить цвет"
        value={value}
        items={items}
        groups={groups}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
