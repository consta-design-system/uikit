import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox size="m" label="Размер M" />
    <Checkbox size="l" label="Размер L" />
  </StoryBookExample>
);
