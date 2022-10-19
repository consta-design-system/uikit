import React from 'react';

import { Table } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithStickyColumn = () => {
  const props = useVariants({ stickyColumns: 1 });
  return (
    <div className={cnTableVariants({ fixedSize: true })}>
      <Table {...props} />
    </div>
  );
};
