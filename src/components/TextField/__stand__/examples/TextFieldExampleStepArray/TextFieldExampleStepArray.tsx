import React, { useState } from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleStepArray = () => {
  const [value, setValue] = useState<number | null>(null);
  const handleChange = ({ value }: { value: number | null }) => setValue(value);

  return (
    <StoryBookExample>
      <TextField
        onChange={handleChange}
        value={value}
        type="number"
        step={[10, 50, 80]}
        min="0"
        max="100"
      />
    </StoryBookExample>
  );
};
