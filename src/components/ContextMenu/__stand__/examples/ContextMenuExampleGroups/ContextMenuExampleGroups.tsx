import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Group = {
  name: string;
  key: number;
};

const groups: Group[] = [
  {
    name: 'Первая группа',
    key: 1,
  },
  {
    name: 'Вторая группа',
    key: 2,
  },
];

type Item = {
  label: string;
  group: number;
};

const items: Item[] = [
  {
    label: 'Пункт 1',
    group: 1,
  },
  {
    label: 'Пункт 2',
    group: 2,
  },
  {
    label: 'Пункт 3',
    group: 2,
  },
];

const sortGroup = (a: number | string, b: number | string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const ContextMenuExampleGroups = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        items={items}
        isOpen={isOpen}
        groups={groups}
        getItemGroupId={(item) => item.group}
        getGroupLabel={(group) => group.name}
        getGroupId={(group) => group.key}
        anchorRef={ref}
        sortGroup={sortGroup}
      />
    </>
  );
};
