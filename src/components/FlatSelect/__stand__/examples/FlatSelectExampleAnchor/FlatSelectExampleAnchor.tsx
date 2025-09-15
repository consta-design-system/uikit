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

export const FlatSelectExampleAnchor = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Example col={1}>
      <Button iconLeft={IconFunnel} ref={anchorRef} />
      <FlatSelect
        {...useSearch({ items })}
        placeholder="Поиск"
        value={value}
        onChange={setValue}
        anchorRef={anchorRef}
      />
    </Example>
  );
};
