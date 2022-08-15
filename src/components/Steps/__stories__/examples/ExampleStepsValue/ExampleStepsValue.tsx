import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsValue = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      items={items}
      value={items[1]}
      getItemLabel={(item) => item}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
