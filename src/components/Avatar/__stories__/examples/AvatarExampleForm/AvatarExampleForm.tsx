import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Avatar } from '../../../Avatar';

export const AvatarExampleForm = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Avatar form="round" />
    <Avatar form="default" />
    <Avatar form="brick" />
  </StoryBookExample>
);
