import React from 'react';

import { withColSpan } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithColSpan = () => {
  const props = useVariants({
    ...withColSpan,
    borderBetweenColumns: true,
    borderBetweenRows: true,
  });
  return <Table {...props} />;
};
