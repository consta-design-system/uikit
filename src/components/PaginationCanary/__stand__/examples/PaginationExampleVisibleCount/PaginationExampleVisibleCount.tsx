import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/PaginationCanary';

export const PaginationExampleVisibleCount = () => {
  const [page, setPage] = useState(1);

  return (
    <Example>
      <Pagination items={15} value={page} onChange={setPage} visibleCount={5} />
      <Pagination items={15} value={page} onChange={setPage} visibleCount={9} />
    </Example>
  );
};
