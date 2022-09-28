import './TextFieldExampleLabel.css';

import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { TextField } from '../../../TextField';

const cnTextFieldExampleLabel = cn('TextFieldExampleLabel');

export const TextFieldExampleLabel = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <div className={cnTextFieldExampleLabel()}>
      <TextField
        onChange={handleChange}
        value={value}
        placeholder="Здесь лейбл сверху"
        label="Лейбл"
        labelPosition="top"
      />
      <TextField
        onChange={handleChange}
        value={value}
        placeholder="Здесь лейбл слева"
        label="Лейбл"
        labelPosition="left"
      />
    </div>
  );
};
