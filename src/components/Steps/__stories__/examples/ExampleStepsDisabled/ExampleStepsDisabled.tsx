import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsDisabled = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      items={items}
      getItemDisabled={(item) => item.disabled}
      value={items[2]}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
