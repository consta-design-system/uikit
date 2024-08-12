import { Example } from '@consta/stand';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { Combobox } from '##/components/Combobox';
import { useFlag } from '##/hooks/useFlag';

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

export function ComboboxExampleOpenByFocus() {
  const [value, setValue] = useState<Item | null>();
  const [isOpened, setIsOpened] = useFlag();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // Запрещаем всплытие клика c input, чтобы предотвратить рассинхронизацию isOpened
  // с внутреннем состоянием раскрытия списка. Так как клик по компонету переключает сотояние,
  // а нам при фокусе нужно не переключекние (toggle) а включение (setTrue)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onclick = (e) => e.stopPropagation();
    }
  }, [inputRef.current]);

  return (
    <Example col={1}>
      <Button onClick={handleFocus} label="Програмный фокус на элемент" />
      <Combobox
        inputRef={inputRef}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите нужный элемент из списка"
        dropdownOpen={isOpened}
        onDropdownOpen={setIsOpened.set}
        onFocus={setIsOpened.on}
      />
    </Example>
  );
}
