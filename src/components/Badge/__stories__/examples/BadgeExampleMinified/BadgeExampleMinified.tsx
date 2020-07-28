import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleMinified = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge minified label="Badge" />
  </StoryBookExample>
);
