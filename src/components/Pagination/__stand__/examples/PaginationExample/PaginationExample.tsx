import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination';

export const PaginationExample = () => {
  const [page, setPage] = useState(1);

  return (
    <Example col={1}>
      <Pagination value={page} onChange={setPage} items={3} />
    </Example>
  );
};
