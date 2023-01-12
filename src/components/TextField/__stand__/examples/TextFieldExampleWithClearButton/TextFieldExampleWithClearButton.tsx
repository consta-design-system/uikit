import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleWithClearButton = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField onChange={handleChange} value={value} withClearButton />
    </Example>
  );
};
