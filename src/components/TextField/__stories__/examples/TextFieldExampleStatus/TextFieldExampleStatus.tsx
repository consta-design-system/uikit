import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleStatus = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField onChange={handleChange} value={value} state="success" placeholder="success" />
      <TextField onChange={handleChange} value={value} state="alert" placeholder="error" />
      <TextField onChange={handleChange} value={value} state="warning" placeholder="warning" />
      <TextField onChange={handleChange} value={value} placeholder="TextField" />
    </StoryBookExample>
  );
};
