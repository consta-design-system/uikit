import './SnackBarExampleText.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar, SnackBarItemDefault } from '../../../SnackBar';

const cnSnackBarExampleText = cn('SnackBarExampleText');

const items: SnackBarItemDefault[] = [
  {
    key: '1',
    message: 'Это просто сообщение',
  },
];

export const SnackBarExampleText = () => {
  return (
    <div className={cnSnackBarExampleText('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleText('SnackBar')} items={items} />
    </div>
  );
};
