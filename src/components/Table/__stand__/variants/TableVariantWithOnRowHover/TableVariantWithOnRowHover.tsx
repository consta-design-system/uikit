import { IconCopy } from '@consta/icons/IconCopy';
import React, { useState } from 'react';

import { Button } from '##/components/Button/Button';
import { tableData } from '##/components/Table/__mock__/data.mock';
import { Table, TableColumn } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithOnRowHover = () => {
  const [hoveredRow, setHoveredRow] = useState<string | undefined>(undefined);
  const rows = tableData.rows.map((row) => ({
    ...row,
    button: (
      <Button
        type="button"
        view="ghost"
        size="xs"
        iconLeft={IconCopy}
        onlyIcon
        style={{ visibility: hoveredRow === row.id ? 'initial' : 'hidden' }}
      />
    ),
  }));

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: 'Появится кнопка при наведении',
      accessor: 'button',
      align: 'center',
      width: 120,
    },
    ...(tableData.columns as TableColumn<typeof rows[number]>[]),
  ];
  const props = useVariants({ rows, columns });

  return <Table {...props} onRowHover={({ id }): void => setHoveredRow(id)} />;
};
