import React, { useState } from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleRequired = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample>
      <TextField
        label="Поле раз"
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Обязательное"
        required
      />
      <TextField
        label="Поле два"
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Необязательное"
      />
    </StoryBookExample>
  );
};
