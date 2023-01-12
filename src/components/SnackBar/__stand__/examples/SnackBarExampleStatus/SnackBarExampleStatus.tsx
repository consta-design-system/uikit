import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { SnackBar } from '../../../SnackBar';

const cnSnackBarExampleStatus = cn('SnackBarExampleStatus');

type Item = {
  key: string;
  message?: string;
  criticality?: number;
};

const items: Item[] = [
  {
    key: '1',
    message: 'Сообщение — normal',
    criticality: 1,
  },
  {
    key: '2',
    message: 'Ошибка — alert',
    criticality: 3,
  },
  {
    key: '3',
    message: 'Предупреждение — warning',
    criticality: 2,
  },
];

const getStatus = (item: Item) => {
  if (item.criticality === 3) {
    return 'alert';
  }
  if (item.criticality === 2) {
    return 'warning';
  }
  return 'normal';
};

export const SnackBarExampleStatus: React.FC = () => {
  return (
    <Example col={1}>
      <SnackBar
        className={cnSnackBarExampleStatus('SnackBar')}
        items={items}
        getItemStatus={getStatus}
      />
    </Example>
  );
};
