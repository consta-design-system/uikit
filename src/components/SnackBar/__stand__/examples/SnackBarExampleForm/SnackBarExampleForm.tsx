import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '##/components/SnackBar/SnackBar';

type Item = {
  key: string;
  message: string;
  buttons?: string[];
};

const items: Item[] = [
  {
    key: '1',
    message: 'С этим сообщением нельзя не согласиться',
    buttons: ['Согласен', 'Не согласен'],
  },
];

export const SnackBarExampleForm = () => {
  return (
    <Example col={1}>
      <SnackBar items={items} form="default" />
      <SnackBar items={items} form="round" />
      <SnackBar items={items} form="brick" />
    </Example>
  );
};
