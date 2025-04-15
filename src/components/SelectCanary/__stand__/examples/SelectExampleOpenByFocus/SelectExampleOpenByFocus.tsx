import { Example } from '@consta/stand';
import React, { useEffect, useRef, useState } from 'react';

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

export function SelectExampleOpenByFocus() {
  const [value, setValue] = useState<Item | null>();
  const [isOpened, setIsOpened] = useFlag();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // Запрещаем всплытие клика c input, чтобы предотвратить рассинхронизацию isOpened
  // с внутренним состоянием раскрытия списка. Так как клик по компоненту переключает состояние скрыт/раскрыт,
  // нам при фокусе требуется не переключение (toggle), а включение (setTrue)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onclick = (e) => e.stopPropagation();
    }
  }, [inputRef.current]);

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
}
