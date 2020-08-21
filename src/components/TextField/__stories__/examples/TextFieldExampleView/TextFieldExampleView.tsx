import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleView = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField view="default" placeholder="Самое обычное поле" />
    <TextField view="clear" placeholder="Незаметное поле" />
  </StoryBookExample>
);

export const TextFieldExampleViewDisabled = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField placeholder="Самое обычное поле" disabled />
  </StoryBookExample>
);
