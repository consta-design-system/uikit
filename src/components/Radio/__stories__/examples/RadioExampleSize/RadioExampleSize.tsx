import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Radio } from '../../../Radio';

export const RadioExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Radio size="m" label="Размер M" />
    <Radio size="l" label="Размер L" />
  </StoryBookExample>
);
