import React from 'react';

import { tableWithExpandableRowsData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCollapcingRows = () => {
  const props = useVariants(tableWithExpandableRowsData);
  return <Table {...props} />;
};
