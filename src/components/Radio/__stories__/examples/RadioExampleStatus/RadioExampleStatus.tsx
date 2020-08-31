import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Radio } from '../../../Radio';

const emptyFunction = () => action('emptyFunction');

export const RadioExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Radio label="Radio" onChange={emptyFunction} checked={undefined} />
    <Radio label="Checked" onChange={emptyFunction} checked />
    <Radio label="Disabled" onChange={emptyFunction} checked={undefined} disabled />
    <Radio label="Checked Disabled" onChange={emptyFunction} checked disabled />
  </StoryBookExample>
);
