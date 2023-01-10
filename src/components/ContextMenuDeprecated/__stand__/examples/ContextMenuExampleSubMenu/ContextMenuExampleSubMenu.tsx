import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

type Item = {
  name: string;
  menu?: Item[];
};

const items: Item[] = [
  {
    name: 'Пункт 1',
    menu: [
      {
        name: 'Пункт 1-1',
      },
      {
        name: 'Пункт 1-2',
      },
      {
        name: 'Пункт 1-3',
        menu: [
          {
            name: 'Пункт 1-3-1',
          },
          {
            name: 'Пункт 1-3-2',
          },
          {
            name: 'Пункт 1-3-3',
          },
        ],
      },
    ],
  },
  {
    name: 'Пункт 2',
  },
  {
    name: 'Пункт 3',
  },
];

export const ContextMenuExampleSubMenu = () => {
  const ref = useRef(null);
  const [open, setOpen] = useFlag();
  return (
    <>
      <Example>
        <Button iconLeft={IconAdd} ref={ref} onClick={setOpen.toggle} />
      </Example>
      {open && (
        <ContextMenu
          items={items}
          getLabel={(item) => item.name}
          anchorRef={ref}
          getSubItems={(item) => item.menu}
        />
      )}
    </>
  );
};
