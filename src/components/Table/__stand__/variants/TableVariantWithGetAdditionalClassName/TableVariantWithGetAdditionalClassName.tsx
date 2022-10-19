import React from 'react';

import { tableDataWithAdditionalClassName } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithGetAdditionalClassName = () => {
  const props = useVariants({ ...tableDataWithAdditionalClassName, size: 'm' });
  return (
    <div className={cnTableVariants()}>
      <Table {...props} />
    </div>
  );
};
