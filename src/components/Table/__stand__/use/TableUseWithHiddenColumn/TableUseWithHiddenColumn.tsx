import '../Table.use.css';

import React, { useState } from 'react';

import { Button } from '##/components/Button/Button';
import {
  rowsForCustomTagLabelFunction,
  tableData,
  withHiddenColumnTableMock,
} from '##/components/Table/__mock__/data.mock';
import { Table, TableProps } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithHiddenColumn = () => {
  const [mock, setMock] = useState<
    TableProps<typeof rowsForCustomTagLabelFunction[number]>
  >(withHiddenColumnTableMock);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleClick = () => {
    setIsHidden(!isHidden);

    const overrideMock = { ...mock };

    overrideMock.columns = overrideMock.columns.map((column) => {
      const newColumn = { ...column };

      if (newColumn.hidden !== undefined) {
        newColumn.hidden = !column.hidden;
      }

      return newColumn;
    });

    setMock(overrideMock);
  };

  return (
    <div className={cnTableUse()}>
      <Button
        type="button"
        label={isHidden ? 'Показать колонку' : 'Скрыть колонку'}
        onClick={handleClick}
      />
      <Table
        {...mock}
        borderBetweenColumns
        borderBetweenRows
        filters={tableData.filters}
      />
    </div>
  );
};
