import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Avatar } from '../../../Avatar';

export const AvatarExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Avatar size="s" />
    <Avatar size="m" />
  </StoryBookExample>
);
