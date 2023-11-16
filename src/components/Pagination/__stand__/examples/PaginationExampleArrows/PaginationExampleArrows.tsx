import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination/Pagination';

export const PaginationExampleArrows = () => {
  const [page, setPage] = useState(1);

  return (
    <Example col={2}>
      <Pagination
        items={5}
        value={page}
        onChange={setPage}
        arrows={[true, true]}
      />
      <Pagination
        items={5}
        value={page}
        onChange={setPage}
        arrows={[{ label: 'Сюда' }, { label: 'Туда' }]}
      />
    </Example>
  );
};
