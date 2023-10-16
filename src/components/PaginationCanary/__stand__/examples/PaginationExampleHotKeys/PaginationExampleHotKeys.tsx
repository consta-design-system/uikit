import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/PaginationCanary/PaginationCanary';

export const PaginationExampleHotKeys = () => {
  const [page, setPage] = useState(1);

  return (
    <Example>
      <Pagination
        items={5}
        value={page}
        onChange={setPage}
        arrows={[{ label: 'Назад' }, { label: 'Вперёд' }]}
        hotKeys={[
          {
            label: '← Shift',
            keys: ['Shift', 'ArrowLeft'],
          },
          {
            label: 'Shift →',
            keys: ['Shift', 'ArrowRight'],
          },
        ]}
      />
    </Example>
  );
};
