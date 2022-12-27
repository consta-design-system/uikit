import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';

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

const getActions = (item: Item) =>
  item.buttons?.map((button) => ({
    label: button,
    onClick: () => {
      console.log(button);
    },
  }));

export const SnackBarExampleButtons: React.FC = () => {
  return (
    <Example col={1}>
      <SnackBar items={items} getItemActions={getActions} />
    </Example>
  );
};
