import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField state="success" placeholder="success" />
    <TextField state="alert" placeholder="error" />
    <TextField state="warning" placeholder="warning" />
    <TextField placeholder="TextField" />
  </StoryBookExample>
);
