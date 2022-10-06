import React from 'react';

import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantBasic = () => {
  const props = useVariants();
  return <Table {...props} />;
};
