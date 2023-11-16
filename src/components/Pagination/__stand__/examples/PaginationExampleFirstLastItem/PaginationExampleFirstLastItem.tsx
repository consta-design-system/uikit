import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination/Pagination';

export const PaginationExampleFirstLastItem = () => {
  const [page, setPage] = useState(7);

  return (
    <Example>
      <Pagination
        items={15}
        value={page}
        onChange={setPage}
        showFirstPage
        showLastPage
        visibleCount={7}
      />
    </Example>
  );
};
