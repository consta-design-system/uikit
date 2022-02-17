import './SnackBarExampleSimple.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';
import { SnackBarItemDefault } from '../../../types';

const cnSnackBarExampleSimple = cn('SnackBarExampleSimple');

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
    <div className={cnSnackBarExampleSimple('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleSimple('SnackBar')} items={items} />
    </div>
  );
};
