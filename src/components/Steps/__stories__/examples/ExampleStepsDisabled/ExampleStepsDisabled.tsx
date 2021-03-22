import React from 'react';
import { action } from '@storybook/addon-actions';

import { items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Steps } from '../../../Steps';

const emptyFunction = action('emptyFunction');

export const ExampleStepsDisabled = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Steps
      items={items}
      getLabel={(item) => item.label}
      getDisabled={(item) => item.disabled || false}
      value={items[2]}
      onChange={emptyFunction}
    />
  </StoryBookExample>
);
