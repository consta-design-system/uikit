import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Pagination } from '##/components/PaginationCanary';
import { PaginationPropForm } from '##/components/PaginationCanary/types';

const forms: PaginationPropForm[] = ['default', 'brick', 'round'];

export const PaginationExampleForm = () => {
  const [page, setPage] = useState(1);

  return (
    <Example
      items={forms}
      getItemDescription={(form) => `form="${form}"`}
      getItemNode={(form) => (
        <Pagination form={form} items={5} value={page} onChange={setPage} />
      )}
    />
  );
};
