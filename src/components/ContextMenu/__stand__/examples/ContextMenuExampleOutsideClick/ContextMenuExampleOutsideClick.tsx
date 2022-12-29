import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
};

const items: Item[] = [
  {
    label: 'Пункт 1',
  },
  {
    label: 'Пункт 2',
  },
  {
    label: 'Пункт 3',
  },
];

export const ContextMenuExampleOutsideClick = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={items}
        anchorRef={ref}
        onClickOutside={() => setIsOpen(false)}
        direction="downStartLeft"
      />
    </>
  );
};
