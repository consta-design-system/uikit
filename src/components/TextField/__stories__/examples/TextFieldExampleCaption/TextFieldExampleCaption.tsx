import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleCaption = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField
        onChange={handleChange}
        value={value}
        state="success"
        placeholder="success"
        caption="success"
      />
      <TextField
        onChange={handleChange}
        value={value}
        state="alert"
        placeholder="error"
        caption="error"
      />
      <TextField
        onChange={handleChange}
        value={value}
        state="warning"
        placeholder="warning"
        caption="warning"
      />
      <TextField onChange={handleChange} value={value} placeholder="TextField" caption="default" />
    </StoryBookExample>
  );
};
