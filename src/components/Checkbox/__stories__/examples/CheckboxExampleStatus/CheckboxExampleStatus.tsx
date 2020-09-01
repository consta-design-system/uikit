import React from 'react';
import { action } from '@storybook/addon-actions';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

const emptyFunction = action('emptyFunction');

export const CheckboxExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox label="Checkbox" onChange={emptyFunction} checked={false} />
    <Checkbox checked label="Checked" onChange={emptyFunction} />
    <Checkbox intermediate label="Intermediate" onChange={emptyFunction} checked={false} />
    <Checkbox disabled label="Disabled" onChange={emptyFunction} checked={false} />
    <Checkbox disabled checked label="Disabled Checked" onChange={emptyFunction} />
  </StoryBookExample>
);
