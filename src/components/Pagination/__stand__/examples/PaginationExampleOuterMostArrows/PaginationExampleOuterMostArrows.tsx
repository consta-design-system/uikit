import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination/Pagination';

export const PaginationExampleOuterMostArrows = () => {
  const [page, setPage] = useState(1);

  return (
    <Example col={1}>
      <Pagination
        items={5}
        value={page}
        onChange={setPage}
        outerMostArrows={[true, true]}
      />
    </Example>
  );
};
