import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleView = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User name="Бон Фишер" info="Старший эксперт" view="ghost" />
    </div>
  </StoryBookExample>
);
