import { Example } from '@consta/stand';
import React from 'react';

import { SnackBar } from '../../../SnackBar';

const items = [
  {
    key: '1',
    message: 'Обработка завершена',
    status: 'success',
    loading: 100,
  },
  {
    key: '2',
    message: 'Обработка данных',
    status: 'system',
    loading: true,
  },
];

export const SnackBarExampleGetItemProgress = () => {
  return (
    <Example col={1}>
      <SnackBar
        items={items}
        getItemProgress={(item) => item.loading}
        progressView="spin"
      />
    </Example>
  );
};
