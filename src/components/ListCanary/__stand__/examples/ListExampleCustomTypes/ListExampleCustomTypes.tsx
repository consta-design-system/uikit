import React, { useState } from 'react';

import { List } from '##/components/ListCanary/ListCanary';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';

export const ListExampleCustomTypes = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        value={value}
        onChange={({ value }) => setValue(value)}
        items={['Первый', 'Второй', 'Третий']}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
      />
    </StoryBookExample>
  );
};
