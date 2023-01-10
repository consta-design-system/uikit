import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  event?: () => void;
};

const items: Item[] = [
  {
    label: 'Пункт 1',
  },
  {
    label: 'Пункт 2',
    event: () => alert('Нажатие на второй пункт'),
  },
  {
    label: 'Пункт 3',
  },
];

export const ContextMenuExampleOnClick = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getItemOnClick = (item: Item) => {
    if (item.event) {
      return item.event;
    }
    return () => alert(item.label);
  };

  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={items}
        anchorRef={ref}
        getItemOnClick={getItemOnClick}
        onClickOutside={() => setIsOpen(false)}
        direction="downStartLeft"
      />
    </>
  );
};
