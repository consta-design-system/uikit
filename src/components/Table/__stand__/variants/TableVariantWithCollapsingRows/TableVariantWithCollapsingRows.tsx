import React from 'react';

import { tableWithExpandableRowsData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCollapsingRows = () => {
  const props = useVariants(tableWithExpandableRowsData);
  return <Table {...props} />;
};
