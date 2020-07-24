import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleAs = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge as="a" href="#" label="Badge" />
  </StoryBookExample>
);
