import React from 'react';

import { Checkbox } from '##/components/Checkbox/Checkbox';
import { Table, TableColumn } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithMergedByCustomCallbackCells = () => {
  const ADMIN_INDEXES = [3, 4, 7];
  const USERS_COUNT = 12;

  const checkedRow: { [key: string]: boolean } = new Array(USERS_COUNT)
    .fill(false)
    .reduce((previous, _, index) => {
      return {
        ...previous,
        [`${index + 1}`]: !Math.round(Math.random()),
      };
    }, {});

  const generateRowBase = (id: string, owner: string, viewed: boolean) => ({
    id,
    owner,
    operationConfirmed: {
      owner,
      viewed,
    },
  });

  const rows = Object.keys(checkedRow).map((id, index) => {
    const isAuto = ADMIN_INDEXES.includes(index);
    return {
      ...generateRowBase(
        id,
        `${isAuto ? 'admin' : 'user'}`,
        isAuto ? true : checkedRow[id],
      ),
    };
  });

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: 'ID',
      accessor: 'id',
      align: 'left',
    },
    {
      title: 'Инициатор операции',
      accessor: 'owner',
      mergeCells: true,
    },
    {
      title: 'Операция подтверждена',
      accessor: 'operationConfirmed',
      mergeCells: true,
      getComparisonValue: ({ owner, viewed }) => `${owner}-${viewed}`,
      renderCell: ({ operationConfirmed: { viewed } }) => (
        <Checkbox checked={viewed} />
      ),
    },
  ];

  const props = useVariants({ rows, columns });

  return <Table {...props} />;
};
