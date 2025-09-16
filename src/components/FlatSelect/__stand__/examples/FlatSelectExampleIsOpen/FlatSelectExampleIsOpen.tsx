import { IconFunnel } from '@consta/icons/IconFunnel';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { useSearch } from '##/components/SelectCanary';

import { FlatSelect, FlatSelectItemDefault } from '../../..';

const items: FlatSelectItemDefault[] = [
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

export const FlatSelectExampleIsOpen = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Example>
      <Button iconLeft={IconFunnel} ref={anchorRef} />
      <Button
        label="Программный вызов"
        onClick={() => setIsOpen((state) => !state)}
        ref={buttonRef}
      />
      <FlatSelect
        {...useSearch({ items })}
        placeholder="Поиск"
        value={value}
        onChange={setValue}
        anchorRef={anchorRef}
        isOpen={isOpen}
        onOpen={setIsOpen}
        ignoreOutsideClicksRefs={[buttonRef]}
      />
    </Example>
  );
};
