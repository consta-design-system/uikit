import './SnackBarExampleButtons.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleButtons = cn('SnackBarExampleButtons');

export const SnackBarExampleButtons = () => {
  const items = [
    {
      key: 1,
      message: 'С этим сообщением нельзя не согласиться',
      status: 'normal',
      actions: [
        {
          label: 'Согласен',
          onClick: () => {
            console.log('Согласен');
          },
        },
        {
          label: 'Не согласен',
          onClick: () => {
            console.log('Не согласен');
          },
        },
      ],
    },
  ];
  return (
    <div className={cnSnackBarExampleButtons('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleButtons('SnackBar')} items={items} />
    </div>
  );
};
