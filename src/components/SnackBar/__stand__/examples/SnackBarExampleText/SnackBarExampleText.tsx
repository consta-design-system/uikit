import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';
import { SnackBarItemDefault } from '../../../types';

const items: SnackBarItemDefault[] = [
  {
    key: '1',
    message: 'Это просто сообщение',
  },
];

export const SnackBarExampleText = () => {
  return (
    <Example>
      <SnackBar items={items} />
    </Example>
  );
};
