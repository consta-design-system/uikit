import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';

const items = [
  {
    key: '1',
    message: 'Обработка завершена',
    status: 'success',
    progress: 100,
  },
  {
    key: '2',
    message: 'Обработка данных',
    status: 'system',
    progress: true,
  },
];

export const SnackBarExampleProgress = () => {
  return (
    <Example col={1}>
      <SnackBar items={items} progressView="spinText" />
    </Example>
  );
};
