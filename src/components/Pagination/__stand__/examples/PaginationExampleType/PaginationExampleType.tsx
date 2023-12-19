import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination/Pagination';
import { PaginationPropType } from '##/components/Pagination/types';

const types: PaginationPropType[] = ['default', 'input'];

export const PaginationExampleType = () => {
  const [page, setPage] = useState(1);

  return (
    <Example
      items={types}
      getItemDescription={(type) => `type="${type}"`}
      getItemNode={(type) => (
        <Pagination
          type={type}
          items={15}
          visibleCount={7}
          value={page}
          onChange={setPage}
        />
      )}
    />
  );
};
