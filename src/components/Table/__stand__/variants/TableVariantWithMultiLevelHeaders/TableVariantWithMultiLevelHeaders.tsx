import React from 'react';

import { tableWithMultiLevelHeadersData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithMultiLevelHeaders = () => {
  const props = useVariants(tableWithMultiLevelHeadersData);
  return <Table {...props} />;
};
