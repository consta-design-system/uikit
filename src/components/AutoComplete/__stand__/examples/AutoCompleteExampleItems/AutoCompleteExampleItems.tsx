import React, { useState } from 'react';

import { basicItems } from '##/components/AutoComplete/__mocks__/data.mock';
import { AutoComplete } from '##/components/AutoComplete/AutoComplete';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';

export const AutoCompleteExampleItems = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <AutoComplete
        type="text"
        placeholder="Введите значение"
        value={value}
        items={basicItems}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};
