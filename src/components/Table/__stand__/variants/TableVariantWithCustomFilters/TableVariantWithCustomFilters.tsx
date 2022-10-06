import React from 'react';

import { customFilters } from '##/components/Table/__mock__/data.mock';
import { Table, TableFilters, TableRow } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCustomFilters = () => {
  const props = useVariants({
    filters: customFilters as TableFilters<TableRow>,
  });
  return (
    <div className={cnTableVariants()}>
      <Table {...props} />
    </div>
  );
};
