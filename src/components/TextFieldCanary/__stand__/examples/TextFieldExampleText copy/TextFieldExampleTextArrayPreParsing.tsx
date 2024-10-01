import { Example } from '@consta/stand';
import React, { useCallback, useRef, useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleTextArrayPreParsing = () => {
  const [value, setValue] = useState<string[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleChange = useCallback((value: string[] | null) => {
    setValue(value);
    handleInputClear();
  }, []);

  const pasteHandle = useCallback((e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text/plain');
    if (!data) {
      return;
    }

    const array = [data.split(','), data.split(' '), data.split('\n')];

    let maxLength = 0;
    let validIndex = 0;

    for (let index = 0; index < array.length; index++) {
      if (array[index].length > maxLength) {
        maxLength = array[index].length;
        validIndex = index;
      }
    }

    const validData = array[validIndex]
      .map((item) => item.trim())
      .filter((item) => !!item);

    if (validData.length > 1) {
      e.preventDefault();
      handleInputClear();
      setValue((state) => [...(state || []), ...validData]);
    }
  }, []);

  return (
    <Example col={1}>
      <TextField
        value={value}
        onChange={handleChange}
        placeholder="Вставте вышеуказанный текст"
        onPaste={pasteHandle}
        type="textarray"
        inputRef={inputRef}
        withClearButton
      />
    </Example>
  );
};
