import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleIncrementButtons = () => {
  const [value, setValue] = useState<number | null>(null);
  const handleChange = ({ value }: { value: number | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField
        onChange={handleChange}
        value={value}
        type="number"
        incrementButtons={false}
      />
    </StoryBookExample>
  );
};
