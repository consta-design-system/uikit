import React from 'react';

import { generateData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithBigData = () => {
  const { rows, columns } = generateData(5000, 5);
  const props = useVariants({ rows, columns });

  return <Table {...props} lazyLoad={{ maxVisibleRows: 150 }} />;
};
