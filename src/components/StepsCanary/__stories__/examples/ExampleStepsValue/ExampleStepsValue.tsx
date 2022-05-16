import React from 'react';
import { action } from '@storybook/addon-actions';

import { simpleItems as items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../StepsCanary';

const emptyFunction = action('emptyFunction');

export const ExampleStepsValue = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps items={items} value={items[1]} getItemLabel={(item) => item} onChange={emptyFunction} />
  </StoryBookExample>
);
