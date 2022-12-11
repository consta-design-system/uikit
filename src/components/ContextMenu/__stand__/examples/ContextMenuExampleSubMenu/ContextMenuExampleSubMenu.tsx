import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  menu?: Item[];
};

const items: Item[] = [
  {
    label: 'Пункт 1',
    menu: [
      {
        label: 'Пункт 1-1',
      },
      {
        label: 'Пункт 1-2',
      },
      {
        label: 'Пункт 1-3',
        menu: [
          {
            label: 'Пункт 1-3-1',
          },
          {
            label: 'Пункт 1-3-2',
          },
          {
            label: 'Пункт 1-3-3',
          },
        ],
      },
    ],
  },
  {
    label: 'Пункт 2',
  },
  {
    label: 'Пункт 3',
  },
];

export const ContextMenuExampleSubMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={items}
        anchorRef={ref}
        getItemSubMenu={(item) => item.menu}
      />
    </>
  );
};
