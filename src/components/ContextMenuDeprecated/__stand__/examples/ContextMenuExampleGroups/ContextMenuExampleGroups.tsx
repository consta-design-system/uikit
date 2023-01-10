import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

export const groups = [
  {
    name: 'Первая группа',
    id: 1,
  },
  {
    name: 'Вторая группа',
    id: 2,
  },
] as const;

export declare type Item = {
  name: string;
  group: typeof groups[number]['id'];
};

const items: Item[] = [
  {
    name: 'Пункт 1',
    group: 1,
  },
  {
    name: 'Пункт 2',
    group: 2,
  },
  {
    name: 'Пункт 3',
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
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useFlag();
  return (
    <>
      <Example>
        <Button iconLeft={IconAdd} ref={ref} onClick={setIsOpen.toggle} />
      </Example>
      {isOpen && (
        <ContextMenu
          items={items}
          getLabel={(item) => item.name}
          getGroupId={(item) => item.group}
          getGroupLabel={(id) => groups.find((group) => group.id === id)?.name}
          anchorRef={ref}
          direction="downStartLeft"
          possibleDirections={['upStartLeft', 'downStartLeft']}
          sortGroup={sortGroup}
        />
      )}
    </>
  );
};
