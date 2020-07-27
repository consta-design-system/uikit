import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleView = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge view="filled" label="Filled badge" />
    <Badge view="stroked" label="Stroked badge" />
  </StoryBookExample>
);
