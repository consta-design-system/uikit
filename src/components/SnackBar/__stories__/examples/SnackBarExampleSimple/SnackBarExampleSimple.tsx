import './SnackBarExampleSimple.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleSimple = cn('SnackBarExampleSimple');

const items = [
  {
    key: 1,
    message: 'Сообщение',
  },
];

export const SnackBarExampleSimple = () => {
  return (
    <div className={cnSnackBarExampleSimple('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleSimple('SnackBar')} items={items} />
    </div>
  );
};
