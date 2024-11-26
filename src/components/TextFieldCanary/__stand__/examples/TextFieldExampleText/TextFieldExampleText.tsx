import { IconDiamond } from '@consta/icons/IconDiamond';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextFieldCanary';

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
  const [value, setValue] = useState<string | null>('текст');

  return (
    <Example col={1}>
      <TextField value={value} onChange={setValue} />
    </Example>
  );
};

export const TextFieldExampleTextLeft = () => {
  return (
    <Example col={1}>
      <TextField leftSide="куда" />
      <TextField leftSide="кому" />
    </Example>
  );
};

export const TextFieldExampleTextRight = () => {
  return (
    <Example col={1}>
      <TextField leftSide={IconDiamond} rightSide="карат" />
    </Example>
  );
};
