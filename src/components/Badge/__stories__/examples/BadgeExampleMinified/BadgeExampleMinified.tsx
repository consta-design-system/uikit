import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleMinified = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge minified status="error" label="Стойте" />
    <Badge minified status="success" label="Идите" />
  </StoryBookExample>
);
