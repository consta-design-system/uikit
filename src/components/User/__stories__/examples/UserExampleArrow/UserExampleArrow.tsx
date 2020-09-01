import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleArrow = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User name="Бон Фишер" info="Старший эксперт" view="ghost" withArrow />
    </div>
    <div>
      <User name="Бон Фишер" info="Старший эксперт" view="ghost" withArrow onlyAvatar />
    </div>
  </StoryBookExample>
);
