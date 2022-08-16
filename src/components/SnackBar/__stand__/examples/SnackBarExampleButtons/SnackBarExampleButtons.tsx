import './SnackBarExampleButtons.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleButtons = cn('SnackBarExampleButtons');

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
    <div className={cnSnackBarExampleButtons('', [cnDocsDecorator('Section')])}>
      <SnackBar
        className={cnSnackBarExampleButtons('SnackBar')}
        items={items}
        getItemActions={getActions}
      />
    </div>
  );
};
