import { IconDiamond } from '@consta/icons/IconDiamond';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleTextPlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        value={value}
        onChange={handleChange}
        placeholder="Здесь только цифры"
      />
    </Example>
  );
};

export const TextFieldExampleTextValue = () => {
  const [value, setValue] = useState<string | null>('стопиццот');
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField value={value} onChange={handleChange} />
    </Example>
  );
};

export const TextFieldExampleTextLeft = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField leftSide="куда" value={value} onChange={handleChange} />
      <TextField leftSide="кому" value={value} onChange={handleChange} />
    </Example>
  );
};
export const TextFieldExampleTextRight = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        leftSide={IconDiamond}
        rightSide="карат"
        value={value}
        onChange={handleChange}
      />
    </Example>
  );
};
