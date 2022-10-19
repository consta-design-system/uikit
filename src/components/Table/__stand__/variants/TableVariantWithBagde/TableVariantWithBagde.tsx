import React from 'react';

import { tableWithBagdeData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithBagde = () => {
  const props = useVariants(tableWithBagdeData);
  return (
    <div className={cnTableVariants({ fixedSize: true })}>
      <Table {...props} />
    </div>
  );
};
