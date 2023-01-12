import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';
import { SnackBarItemDefault } from '../../../types';

const items: SnackBarItemDefault[] = [
  {
    key: '1',
    message: 'Сообщение 1',
    status: 'normal',
  },
  {
    key: '2',
    message: 'Сообщение 2',
    status: 'system',
  },
  {
    key: '3',
    message: 'Сообщение 3',
    status: 'alert',
  },
  {
    key: '4',
    message: 'Сообщение 4',
    status: 'warning',
  },
  {
    key: '5',
    message: 'Сообщение 5',
    status: 'success',
  },
];

export const SnackBarExampleSimple = () => {
  return (
    <Example col={1}>
      <SnackBar items={items} />
    </Example>
  );
};
