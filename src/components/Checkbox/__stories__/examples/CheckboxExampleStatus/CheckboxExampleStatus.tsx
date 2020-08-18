import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox label="Checkbox" />
    <Checkbox checked label="Checked" />
    <Checkbox intermediate label="Intermediate" />
    <Checkbox disabled label="Disabled" />
    <Checkbox disabled checked label="Disabled Checked" />
  </StoryBookExample>
);
