import React from 'react';

import { Checkbox } from '##/components/Checkbox/Checkbox';
import { Table, TableColumn } from '##/components/Table/Table';
import { updateAt } from '##/utils/array';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCheckboxHeader = () => {
  const ROWS_COUNT = 3;
  const [values, setValues] = React.useState<boolean[]>(
    new Array(ROWS_COUNT).fill(false),
  );
  const toggleRow = (idx: number): void => {
    setValues(updateAt(values, idx, !values[idx]));
  };

  const rows = values.map((value, idx) => ({
    id: `row${idx}`,
    checkbox: (
      <Checkbox
        size="m"
        checked={value}
        onChange={(): void => toggleRow(idx)}
      />
    ),
    task: `Задача ${idx}`,
  }));

  const areAllSelected = values.every((v) => v);

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: (
        <Checkbox
          size="m"
          checked={areAllSelected}
          onChange={(): void => setValues(values.map(() => !areAllSelected))}
        />
      ),
      accessor: 'checkbox',
      width: 60,
    },
    {
      title: 'Задача',
      accessor: 'task',
    },
  ];

  const props = useVariants({ rows, columns });

  return (
    <div className={cnTableVariants({ fixedSize: true })}>
      <Table {...props} />
    </div>
  );
};
