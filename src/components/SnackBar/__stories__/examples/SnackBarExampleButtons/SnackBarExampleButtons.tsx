import './SnackBarExampleButtons.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Item, SnackBar } from '../../../SnackBar';

const cnSnackBarExampleButtons = cn('SnackBarExampleButtons');

const items: Item[] = [
  {
    key: 1,
    message: 'С этим сообщением нельзя не согласиться',
    status: 'normal',
    testId: 'testID',
    actions: [
      {
        label: 'Согласен',
        onClick: (): void => {
          // eslint-disable-next-line no-console
          console.log('Согласен');
        },
      },
      {
        label: 'Не согласен',
        onClick: (): void => {
          // eslint-disable-next-line no-console
          console.log('Не согласен');
        },
      },
    ],
  },
];

export const SnackBarExampleButtons: React.FC = () => {
  return (
    <div className={cnSnackBarExampleButtons('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleButtons('SnackBar')} items={items} />
    </div>
  );
};
