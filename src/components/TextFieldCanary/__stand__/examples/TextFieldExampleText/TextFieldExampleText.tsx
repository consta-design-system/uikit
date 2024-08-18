import { IconDiamond } from '@consta/icons/IconDiamond';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleTextPlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        value={value}
        onChange={setValue}
        placeholder="Здесь только цифры"
      />
    </Example>
  );
};

export const TextFieldExampleTextValue = () => {
  const [value, setValue] = useState<string | null>('стопиццот');

  return (
    <Example col={1}>
      <TextField value={value} onChange={setValue} />
    </Example>
  );
};

export const TextFieldExampleTextLeft = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField leftSide="куда" value={value} onChange={setValue} />
      <TextField leftSide="кому" value={value} onChange={setValue} />
    </Example>
  );
};
export const TextFieldExampleTextRight = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        leftSide={IconDiamond}
        rightSide="карат"
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
