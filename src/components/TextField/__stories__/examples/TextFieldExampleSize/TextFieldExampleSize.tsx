import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <TextField size="xs" placeholder="Размер XS" />
    </div>
    <div>
      <TextField size="s" placeholder="Размер S" />
    </div>
    <div>
      <TextField size="m" placeholder="Размер M" />
    </div>
    <div>
      <TextField size="l" placeholder="Размер L" />
    </div>
  </StoryBookExample>
);

export const TextFieldExampleSizeWidth = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField width="full" placeholder="Страшно широкое поле" />
  </StoryBookExample>
);

export const TextFieldExampleSizeRows = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField
      type="textarea"
      rows="13"
      cols="25"
      value="Я иду и пою обо всем хорошем и улыбку свою я дарю прхожим"
    />
  </StoryBookExample>
);

export const TextFieldExampleSizeMinRows = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField
      type="textarea"
      minRows="13"
      cols="25"
      value="Я иду и пою обо всем хорошем и улыбку свою я дарю прхожим"
    />
  </StoryBookExample>
);
