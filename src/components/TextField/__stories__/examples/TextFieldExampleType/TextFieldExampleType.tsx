import React, { useState } from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleTypeText = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample>
      <TextField onChange={handleChange} value={value} type="text" placeholder="Одна строчка" />
    </StoryBookExample>
  );
};

export const TextFieldExampleTypeTextarea = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample>
      <TextField
        onChange={handleChange}
        value={value}
        type="textarea"
        cols={200}
        rows={3}
        placeholder="Несколько строчек"
      />
    </StoryBookExample>
  );
};

export const TextFieldExampleTypeNumber = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample>
      <TextField
        onChange={handleChange}
        value={value}
        type="number"
        step="2"
        placeholder="Здесь цифры"
      />
    </StoryBookExample>
  );
};
