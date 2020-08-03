import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Avatar } from '../../../Avatar';

export const AvatarExampleImage = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Avatar
      url="https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png"
      name="Вадим Матвеев"
    />
    <Avatar name="Вадим Матвеев" />
    <Avatar name="Матвеев Вадим Александрович" />
    <Avatar />
  </StoryBookExample>
);
