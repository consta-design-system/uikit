import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleStepArray = () => {
  const [value, setValue] = useState<string | undefined | null>(undefined);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        onChange={handleChange}
        value={value}
        type="number"
        step={[10, 50, 80]}
        min="0"
        max="100"
      />
    </Example>
  );
};
