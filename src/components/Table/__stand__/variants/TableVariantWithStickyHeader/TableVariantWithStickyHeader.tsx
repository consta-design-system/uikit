import React from 'react';

import { Table } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithStickyHeader = () => {
  const props = useVariants({ stickyHeader: true });
  return (
    <div className={cnTableVariants({ fixedSize: true })}>
      <Table {...props} />
    </div>
  );
};
