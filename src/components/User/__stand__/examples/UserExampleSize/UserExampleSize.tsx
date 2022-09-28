import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User name="Серж Послоян" info="Размер S" view="ghost" size="s" />
    </div>
    <div>
      <User name="Серж Послоян" info="Размер M" view="ghost" size="m" />
    </div>
  </StoryBookExample>
);

export const UserExampleSizeWidth = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <User name="Серж Послоян" info="В ширину блока" view="ghost" width="full" />
  </StoryBookExample>
);
