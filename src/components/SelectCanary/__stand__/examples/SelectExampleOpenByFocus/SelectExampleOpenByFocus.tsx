import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { useFlag } from '##/hooks/useFlag';

import { Select } from '../../..';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

export const SelectExampleOpenByFocus = () => {
  const [value, setValue] = useState<Item | null>();
  const [isOpened, setIsOpened] = useFlag();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => inputRef.current?.focus();

  return (
    <Example col={1}>
      <Button onClick={handleFocus} label="Эмулировать фокус на элемент" />
      <Select
        inputRef={inputRef}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите элемент"
        dropdownOpen={isOpened}
        onDropdownOpen={setIsOpened.set}
        onFocus={setIsOpened.on}
      />
    </Example>
  );
};
