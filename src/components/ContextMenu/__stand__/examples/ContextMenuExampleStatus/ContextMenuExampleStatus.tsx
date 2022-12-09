import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  accent: 'alert' | 'warning' | 'success';
};

const items: Item[] = [
  {
    label: 'Пункт 1',
    accent: 'alert',
  },
  {
    label: 'Пункт 2',
    accent: 'warning',
  },
  {
    label: 'Пункт 3',
    accent: 'success',
  },
];

export const ContextMenuExampleStatus = () => {
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
        getItemStatus={(item) => item.accent}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </>
  );
};
