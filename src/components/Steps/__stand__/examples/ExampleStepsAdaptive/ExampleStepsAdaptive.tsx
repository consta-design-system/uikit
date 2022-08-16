import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { simpleItems as items } from '../../../__mocks__/mock.data';
import { Steps } from '../../../Steps';

const emptyFunction = () => {};

export const ExampleStepsAdaptive = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section')}
    style={{ maxWidth: 200 }}
  >
    <Steps
      items={items}
      value={items[1]}
      getItemLabel={(item) => item}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
