import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Radio } from '../../../Radio';

export const RadioExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Radio label="Radio" />
    <Radio label="Checked" checked />
    <Radio label="Disabled" disabled />
    <Radio label="Checked Disabled" checked disabled />
  </StoryBookExample>
);
