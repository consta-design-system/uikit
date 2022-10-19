import React from 'react';

import { tableDataWithRenderFn } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantCustomRows = () => {
  const { columns, ...props } = useVariants(tableDataWithRenderFn);

  const copyColumns = [...columns].map((column) => {
    const copy = { ...column };
    if (copy.accessor === 'year') {
      copy.renderCell = (row: typeof props.rows[number]): React.ReactNode => {
        return <h2>{row.year.value}</h2>;
      };
    }
    return copy;
  });

  return <Table columns={copyColumns} {...props} />;
};
