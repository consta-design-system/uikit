import { Example } from '@consta/stand';
import React from 'react';

import { IconDisconnection } from '../../../../../icons/IconDisconnection/IconDisconnection';
import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
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
