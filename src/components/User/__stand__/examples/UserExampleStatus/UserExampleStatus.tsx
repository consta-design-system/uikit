import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { User } from '../../../User';

export const UserExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <User name="Камилла Флюдиндер" info="Онлайн" status="available" />
    </div>
    <div>
      <User name="Камилла Флюдиндер" info="Из дома" status="remote" />
    </div>
    <div>
      <User name="Камилла Флюдиндер" info="Недоступна" status="out" />
    </div>
  </StoryBookExample>
);
