import './SnackBarExampleButtons.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleButtons = cn('SnackBarExampleButtons');

type Item = {
  key: number;
  message: string;
  buttons?: string[];
};

const items: Item[] = [
  {
    key: 1,
    message: 'С этим сообщением нельзя не согласиться',
    buttons: ['Согласен', 'Не согласен'],
  },
];

const getActions = (buttons?: string[]) => {
  if (Array.isArray(buttons)) {
    return buttons.map((button) => ({
      label: button,
      onClick: () => {
        console.log(button);
      },
    }));
  }
  return undefined;
};

export const SnackBarExampleButtons: React.FC = () => {
  return (
    <div className={cnSnackBarExampleButtons('', [cnDocsDecorator('Section')])}>
      <SnackBar
        className={cnSnackBarExampleButtons('SnackBar')}
        items={items}
        getItemActions={(item) => getActions(item.buttons)}
      />
    </div>
  );
};
