import { IconComponent } from '@consta/icons/Icon';
import { IconClose } from '@consta/icons/IconClose';
import { IconUser } from '@consta/icons/IconUser';
import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { List } from '##/components/ListCanary';

type Item = {
  label: string;
  leftIcon: IconComponent;
  work: 'дома' | 'в офисе' | 'не работает';
};

const items: Item[] = [
  {
    label: 'Андрей',
    leftIcon: IconUser,
    work: 'дома',
  },
  {
    label: 'Иван',
    leftIcon: IconUser,
    work: 'в офисе',
  },
  {
    label: 'Дементий',
    leftIcon: IconClose,
    work: 'не работает',
  },
];

export const ListExampleAdditionalElements = () => {
  return (
    <Example>
      <List
        items={items}
        getItemRightSide={(item) => (
          <Badge
            label={item.work}
            size="s"
            status={item.work === 'не работает' ? 'warning' : 'success'}
          />
        )}
        onItemClick={(item) => alert(`${item.label} ${item.work}`)}
      />
    </Example>
  );
};
