import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { PaginationBase } from '##/components/Pagination/PaginationBase';
import { PaginationBaseItemDefault } from '##/components/Pagination/types';

const baseItems: PaginationBaseItemDefault[] = [
  {
    key: 1,
    label: '01',
  },
  {
    key: 2,
    label: '02',
  },
  {
    key: 3,
    label: '03',
  },
];

export const PaginationBaseExample = () => {
  const [value, setValue] = useState(baseItems[0]);

  return (
    <Example>
      <PaginationBase items={baseItems} value={value} onChange={setValue} />
    </Example>
  );
};
