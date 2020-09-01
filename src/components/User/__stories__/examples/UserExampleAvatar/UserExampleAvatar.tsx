import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleAvatar = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User
        avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
        name="Роберт Пласт"
        info="Cейсмик"
      />
    </div>
    <div>
      <User
        avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
        name="Роберт Пласт"
        info="Cейсмик"
        onlyAvatar
      />
    </div>
  </StoryBookExample>
);

export const UserExampleAvatarName = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User name="Роберт Пласт" info="Cейсмик" />
    </div>
    <div>
      <User name="Роберт Альбертович Пласт" info="Cейсмик" onlyAvatar />
    </div>
  </StoryBookExample>
);
