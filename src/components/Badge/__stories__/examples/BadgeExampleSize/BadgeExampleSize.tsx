import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge size="s" label="Badge" />
    <Badge size="m" label="Badge" />
    <Badge size="l" label="Badge" />
  </StoryBookExample>
);
