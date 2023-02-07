import IMask from 'imask';
import React, { useEffect, useRef, useState } from 'react';

import { TextField } from '##/components/TextField/TextField';

export const TextFieldExampleMaskAmount = () => {
  const [value, setValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedNumberOptions> | null>(
    null,
  );
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = IMask(inputRef.current, {
        mask: Number,
        min: 0,
        scale: 2,
        thousandsSeparator: ' ',
        radix: ',',
        padFractionalZeros: true,
        normalizeZeros: true,
        mapToRadix: ['.'],
      });
    }
  }, []);

  useEffect(() => {
    imaskRef.current?.on('accept', () =>
      setValue(imaskRef.current?.value || null),
    );
    return () => {
      imaskRef.current?.off('accept', () =>
        setValue(imaskRef.current?.value || null),
      );
    };
  }, []);

  return (
    <TextField
      value={value}
      label="Сумма"
      placeholder="0"
      inputRef={inputRef}
    />
  );
};

export const TextFieldExampleMaskPhone = () => {
  const [value, setValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mask = '+{7}(000)000-00-00';
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedPatternOptions> | null>(
    null,
  );
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = IMask(inputRef.current, {
        mask,
      });
    }
  }, []);

  useEffect(() => {
    imaskRef.current?.on('accept', () =>
      setValue(imaskRef.current?.value || null),
    );
    return () => {
      imaskRef.current?.off('accept', () =>
        setValue(imaskRef.current?.value || null),
      );
    };
  }, []);

  return (
    <TextField
      value={value}
      label="Телефон"
      placeholder="+7(999)999-99-99"
      inputRef={inputRef}
    />
  );
};

export const TextFieldExampleMaskPassport = () => {
  const [value, setValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mask = '00 00 000000';
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedPatternOptions> | null>(
    null,
  );
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = IMask(inputRef.current, {
        mask,
      });
    }
  }, []);

  useEffect(() => {
    imaskRef.current?.on('accept', () =>
      setValue(imaskRef.current?.value || null),
    );
    return () => {
      imaskRef.current?.off('accept', () =>
        setValue(imaskRef.current?.value || null),
      );
    };
  }, []);

  return (
    <TextField
      value={value}
      label="Пасспорт"
      placeholder="00 00 000000"
      inputRef={inputRef}
    />
  );
};

export const TextFieldExampleMaskBankAccount = () => {
  const [value, setValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mask = '0000 0000 0000 0000';
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedPatternOptions> | null>(
    null,
  );
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = IMask(inputRef.current, {
        mask,
      });
    }
  }, []);

  useEffect(() => {
    imaskRef.current?.on('accept', () =>
      setValue(imaskRef.current?.value || null),
    );
    return () => {
      imaskRef.current?.off('accept', () =>
        setValue(imaskRef.current?.value || null),
      );
    };
  }, []);

  return (
    <TextField
      value={value}
      label="Номер карты"
      placeholder="1111 1111 1111 1111"
      inputRef={inputRef}
    />
  );
};
