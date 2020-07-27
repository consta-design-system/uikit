import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleForm = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge form="default" label="Default badge" />
    <Badge form="round" label="Round badge" />
  </StoryBookExample>
);
