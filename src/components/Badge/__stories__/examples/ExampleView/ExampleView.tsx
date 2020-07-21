import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const ExampleView = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge view="filled" label="Badge" />
    <Badge view="stroked" label="Badge" />
  </StoryBookExample>
);
