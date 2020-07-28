import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge status="success" label="Badge" />
    <Badge status="error" label="Badge" />
    <Badge status="warning" label="Badge" />
    <Badge status="normal" label="Badge" />
    <Badge status="system" label="Badge" />
  </StoryBookExample>
);
