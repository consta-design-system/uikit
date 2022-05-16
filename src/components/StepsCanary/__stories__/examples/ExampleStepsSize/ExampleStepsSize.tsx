import React from 'react';
import { action } from '@storybook/addon-actions';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../StepsCanary';

const emptyFunction = action('emptyFunction');

export const ExampleStepsSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      size="m"
      items={items}
      getItemLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
    <Steps
      size="l"
      items={items}
      getItemLabel={(item) => item}
      value={items[1]}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
