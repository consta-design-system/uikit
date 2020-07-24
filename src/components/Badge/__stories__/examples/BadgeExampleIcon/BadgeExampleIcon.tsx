import React from 'react';

import { IconUser } from '../../../../../icons/IconUser/IconUser';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleIcon = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge icon={IconUser} label="Badge" />
  </StoryBookExample>
);
