import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleName = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User
        avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
        name="Гюзель Скважина"
        info="В отпуске"
      />
    </div>
    <div>
      <User avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png" name="Люций" info="Эксперт" />
    </div>
  </StoryBookExample>
);
