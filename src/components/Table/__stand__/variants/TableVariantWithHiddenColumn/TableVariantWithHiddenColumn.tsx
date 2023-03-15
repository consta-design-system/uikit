import React, { useState } from 'react';

import { Button } from '##/components/Button/Button';
import {
  rowsForCustomTagLabelFunction,
  withHiddenColumnTableMock,
} from '##/components/Table/__mock__/data.mock';
import { Table, TableProps } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithHiddenColumn = () => {
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
  const props = useVariants(mock);
  return (
    <div>
      <Button
        type="button"
        label={isHidden ? 'Показать колонку' : 'Скрыть колонку'}
        onClick={handleClick}
      />
      <Table {...props} columns={mock.columns} />{' '}
    </div>
  );
};
