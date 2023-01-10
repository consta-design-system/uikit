import { IconDisconnection } from '@consta/icons/IconDisconnection';
import { IconMoon } from '@consta/icons/IconMoon';
import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';

type Item = {
  key: string;
  message: string;
  status: 'normal' | 'warning';
};

const items: Item[] = [
  {
    key: '1',
    message: 'Тихо, тигры спят!',
    status: 'normal',
  },
  {
    key: '2',
    message: 'Интернет внезапно кончился',
    status: 'warning',
  },
];

const getIcon = (item: Item) => {
  if (item.status === 'normal') {
    return IconMoon;
  }
  return IconDisconnection;
};

export const SnackBarExampleIcon = () => {
  return (
    <Example col={1}>
      <SnackBar items={items} getItemIcon={getIcon} />
    </Example>
  );
};
