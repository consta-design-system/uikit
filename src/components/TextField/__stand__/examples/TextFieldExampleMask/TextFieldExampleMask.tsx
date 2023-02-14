import './TextFieldExampleMask.css';

import { Example } from '@consta/stand';
import IMask from 'imask';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { TextField } from '##/components/TextField/TextField';
import { useIMask } from '##/components/TextField/useIMask';
import { cn } from '##/utils/bem';

const cnTextFieldExampleMask = cn('TextFieldExampleMask');

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

export const TextFieldExampleMaskPipe = () => {
  const [value, setValue] = useState<string | null>(null);

  const mask = '+{7}(000)000-00-00';

  const { inputRef } = useIMask({
    value,
    onChange: setValue,
    maskOptions: mask,
  });

  return (
    <Example>
      <div className={cnTextFieldExampleMask()}>
        <TextField
          value={value}
          label="Телефон"
          placeholder="+7(999)999-99-99"
          inputRef={inputRef}
        />
        <Button
          label="Изменить"
          onClick={() => setValue(IMask.pipe('79121', { mask }))}
        />
      </div>
    </Example>
  );
};
