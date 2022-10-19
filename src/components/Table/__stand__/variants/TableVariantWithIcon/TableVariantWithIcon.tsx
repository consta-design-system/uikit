import React from 'react';

import { withControlTableMock } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithIcon = () => {
  const props = useVariants(withControlTableMock);
  return <Table {...props} />;
};
