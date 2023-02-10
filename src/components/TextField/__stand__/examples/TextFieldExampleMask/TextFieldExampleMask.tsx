import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '##/components/TextField/TextField';
import { useIMask } from '##/components/TextField/useIMask';

export const TextFieldExampleMaskAmount = () => {
  const [value, setValue] = useState<string | null>(null);

  const { inputRef } = useIMask({
    value,
    onChange: setValue,
    maskOptions: {
      mask: Number,
      min: 0,
      scale: 2,
      thousandsSeparator: ' ',
      radix: ',',
      padFractionalZeros: true,
      autofix: true,
      lazy: true,
      normalizeZeros: true,
      mapToRadix: ['.'],
    },
  });

  return (
    <Example>
      <TextField
        value={value}
        label="Сумма"
        placeholder="0"
        inputRef={inputRef}
      />
    </Example>
  );
};

export const TextFieldExampleMaskPhone = () => {
  const [value, setValue] = useState<string | null>(null);

  const { inputRef } = useIMask({
    value,
    onChange: setValue,
    maskOptions: '+{7}(000)000-00-00',
  });

  return (
    <Example>
      <TextField
        value={value}
        label="Телефон"
        placeholder="+7(999)999-99-99"
        inputRef={inputRef}
      />
    </Example>
  );
};

export const TextFieldExampleMaskPassport = () => {
  const [value, setValue] = useState<string | null>(null);

  const { inputRef } = useIMask({
    value,
    onChange: setValue,
    maskOptions: '00 00 000000',
  });

  return (
    <Example>
      <TextField
        value={value}
        label="Пасспорт"
        placeholder="00 00 000000"
        inputRef={inputRef}
      />
    </Example>
  );
};

export const TextFieldExampleMaskBankAccount = () => {
  const [value, setValue] = useState<string | null>(null);

  const { inputRef } = useIMask({
    value,
    onChange: setValue,
    maskOptions: '0000 0000 0000 0000',
  });

  return (
    <Example>
      <TextField
        value={value}
        label="Номер карты"
        placeholder="1111 1111 1111 1111"
        inputRef={inputRef}
      />
    </Example>
  );
};
