import React, { useState } from 'react';

import { SortByProps, Table, TableColumn } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantSortByData = () => {
  const [sortSetting, setSortSetting] = useState<SortByProps<any> | null>(null);
  const data = [
    {
      id: 1,
      date: new Date(
        'Thu Dec 03 2020 14:23:13 GMT+0300 (Moscow Standard Time)',
      ),
    },
    {
      id: 2,
      date: new Date(
        'Thu Dec 03 2020 14:04:13 GMT+0300 (Moscow Standard Time)',
      ),
    },
    {
      id: 3,
      date: new Date(
        'Thu Dec 03 2020 14:55:13 GMT+0300 (Moscow Standard Time)',
      ),
    },
    {
      id: 4,
      date: new Date(
        'Thu Dec 03 2020 14:12:13 GMT+0300 (Moscow Standard Time)',
      ),
    },
  ];

  const rows = data
    .sort((a, b) => {
      if (sortSetting?.sortingBy === 'date') {
        const [firstDate, secondDate] =
          sortSetting.sortOrder === 'asc' ? [a.date, b.date] : [b.date, a.date];
        return firstDate.valueOf() - secondDate.valueOf();
      }
      return 0;
    })
    .map((item) => ({
      id: item.id.toString(),
      date: item.date.toString(),
    }));

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: `Id`,
      accessor: `id`,
      sortable: true,
    },
    {
      title: `Дата`,
      accessor: `date`,
      sortable: true,
    },
  ];

  const props = useVariants({ rows, columns });
  return <Table {...props} onSortBy={setSortSetting} />;
};
