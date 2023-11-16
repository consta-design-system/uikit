import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/Pagination';
import { PaginationPropSize } from '##/components/Pagination/types';

const sizes: PaginationPropSize[] = ['xs', 's', 'm', 'l'];

export const PaginationExampleSize = () => {
  const [page, setPage] = useState(1);

  return (
    <Example
      items={sizes}
      getItemDescription={(size) => `size="${size}"`}
      getItemNode={(size) => (
        <Pagination size={size} items={5} value={page} onChange={setPage} />
      )}
    />
  );
};
