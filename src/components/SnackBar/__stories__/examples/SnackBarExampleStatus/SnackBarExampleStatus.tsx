import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleStatus = cn('SnackBarExampleStatus');

export const SnackBarExampleStatus = () => {
  const items = [
    {
      key: 1,
      message: 'Сообщение — normal',
      status: 'normal',
    },
    {
      key: 2,
      message: 'Ошибка — alert',
      status: 'alert',
    },
    {
      key: 3,
      message: 'Предупреждение — warning',
      status: 'warning',
    },
    {
      key: 4,
      message: 'Успех — success',
      status: 'success',
    },
    {
      key: 5,
      message: 'Системное — system',
      status: 'system',
    },
  ];
  return (
    <div className={cnSnackBarExampleStatus('', [cnDocsDecorator('Section')])}>
      <SnackBar className={cnSnackBarExampleStatus('SnackBar')} items={items} />
    </div>
  );
};
