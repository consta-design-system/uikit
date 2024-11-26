import React from 'react';

import { tableWithBadgeData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithBadge = () => {
  const props = useVariants(tableWithBadgeData);
  return (
    <div className={cnTableVariants({ fixedSize: true })}>
      <Table {...props} />
    </div>
  );
};
