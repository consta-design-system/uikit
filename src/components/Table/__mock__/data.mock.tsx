import React from 'react';

import { Badge } from '../../Badge/Badge';
import { Props as TableProps, TableFilters as Filters } from '../Table';

export const rows = [
  {
    id: 'row1',
    field: 'Приобское',
    year: 1982,
    type: 'Нефтяное',
    estimatedReserves: 5000,
    remainingReserves: 1700,
    production: 33,
    total: 313,
  },
  {
    id: 'row2',
    field: 'Уренгойское газонефтеконденсат­ное',
    year: 2001,
    type: 'Конденсатное',
    estimatedReserves: 7540,
    remainingReserves: 7540,
    production: 363,
    total: 88,
  },
  {
    id: 'row3',
    field: 'Красноленинская группа',
    year: 1985,
    type: 'Комбинированное',
    estimatedReserves: 8766,
    remainingReserves: 3374,
    production: 256,
    total: 434,
  },
  {
    id: 'row4',
    field: 'Великое',
    year: 1989,
    type: 'Конденсатное',
    estimatedReserves: 1697,
    remainingReserves: 4818,
    production: 250,
    total: 236,
  },
  {
    id: 'row5',
    field: 'Русское газонефтяное',
    year: 1997,
    type: 'Нефтяное',
    estimatedReserves: 5169,
    remainingReserves: 3712,
    production: 292,
    total: 417,
  },
];

export const filters: Filters<typeof rows[number]> = [
  {
    id: 'olderThan2018',
    name: 'Старше 2018 года',
    filterer: (value: number | string) => Number(value) > 2018,
    field: 'year',
  },
  {
    id: 'olderThan2000',
    name: 'Старше 2000 года',
    filterer: (value: number | string) => Number(value) > 2000,
    field: 'year',
  },
  {
    id: 'inRangeOf90s',
    name: 'Датируемые 90-ми годами',
    filterer: (value: number | string) => Number(value) >= 1990 && Number(value) <= 1999,
    field: 'year',
  },
  {
    id: 'equalOrOlder80s',
    name: 'Датируемые 80-ми годами и старше',
    filterer: (value: number | string) => Number(value) <= 1989,
    field: 'year',
  },
  {
    id: 'oil',
    name: 'Нефтяное',
    filterer: (value: string) => value === 'Нефтяное',
    field: 'type',
  },
  {
    id: 'condensated',
    name: 'Конденсатное',
    filterer: (value: string) => value === 'Конденсатное',
    field: 'type',
  },
  {
    id: 'combined',
    name: 'Комбинированное',
    filterer: (value: string) => value === 'Комбинированное',
    field: 'type',
  },
  {
    id: 'priobskoye',
    name: 'Приобское',
    filterer: (value: string) => value === 'Приобское',
    field: 'field',
  },
  {
    id: 'urengoyskoye',
    name: 'Уренгойское газонефтеконденсат­ное',
    filterer: (value: string) => value === 'Уренгойское газонефтеконденсат­ное',
    field: 'field',
  },
  {
    id: 'krasnoleninskaya',
    name: 'Красноленинская группа',
    filterer: (value: string) => value === 'Красноленинская группа',
    field: 'field',
  },
  {
    id: 'velikoye',
    name: 'Великое',
    filterer: (value: string) => value === 'Великое',
    field: 'field',
  },
  {
    id: 'rusGasoil',
    name: 'Русское газонефтяное',
    filterer: (value: string) => value === 'Русское газонефтяное',
    field: 'field',
  },
  {
    id: 'estimatedReservesLessThan1000',
    name: 'Меньше 1000',
    filterer: (value: number | string) => Number(value) < 1000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReservesFrom1000To5000',
    name: 'От 1000 (вкл.) до 5000 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 1000 && Number(value) < 5000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReservesFrom5000To8000',
    name: 'От 5000 (вкл.) до 8000 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 5000 && Number(value) < 8000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReserves8000AndMore',
    name: '8000 и более',
    filterer: (value: number | string) => Number(value) >= 8000,
    field: 'estimatedReserves',
  },
  {
    id: 'remainingReservesLessThan1000',
    name: 'Меньше 1000',
    filterer: (value: number | string) => Number(value) < 1000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReservesFrom1000To5000',
    name: 'От 1000 (вкл.) до 5000 (не вкл)',
    filterer: (value: number | string) => Number(value) >= 1000 && Number(value) < 5000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReservesFrom5000To8000',
    name: 'От 5000 (вкл.) до 8000 (не вкл)',
    filterer: (value: number | string) => Number(value) >= 5000 && Number(value) < 8000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReserves8000AndMore',
    name: '8000 и более',
    filterer: (value: number | string) => Number(value) >= 8000,
    field: 'remainingReserves',
  },
  {
    id: 'productionLessThan100',
    name: 'Меньше 100',
    filterer: (value: number | string) => Number(value) < 100,
    field: 'production',
  },
  {
    id: 'productionFrom100To200',
    name: 'От 100 (вкл.) до 200 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 100 && Number(value) < 200,
    field: 'production',
  },
  {
    id: 'productionFrom200To300',
    name: 'От 200 (вкл.) до 300 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 200 && Number(value) < 300,
    field: 'production',
  },
  {
    id: 'productionMoreThan300',
    name: '300 и более',
    filterer: (value: number | string) => Number(value) >= 300,
    field: 'production',
  },
  {
    id: 'totalLessThan100',
    name: 'Меньше 100',
    filterer: (value: number | string) => Number(value) < 100,
    field: 'total',
  },
  {
    id: 'totalFrom100To200',
    name: 'От 100 (вкл.) до 200 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 100 && Number(value) < 200,
    field: 'total',
  },
  {
    id: 'totalFrom200To300',
    name: 'От 200 (вкл.) до 300 (не вкл.)',
    filterer: (value: number | string) => Number(value) >= 200 && Number(value) < 300,
    field: 'total',
  },
  {
    id: 'totalMoreThan300',
    name: '300 и более',
    filterer: (value: number | string) => Number(value) >= 300,
    field: 'total',
  },
];

export const tableData: TableProps<typeof rows[number]> = {
  columns: [
    {
      title: 'Месторождение',
      accessor: 'field',
      align: 'left',
      sortable: true,
    },
    {
      title: 'Год открытия',
      accessor: 'year',
      align: 'center',
      sortable: true,
    },
    {
      title: 'Тип',
      accessor: 'type',
      align: 'center',
    },
    {
      title: 'Предполагаемые полные \nзапасы, млн.т.',
      accessor: 'estimatedReserves',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Остаточные извлекаемые \nзапасы, млн.т.',
      accessor: 'remainingReserves',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Добыча тыс.т/сут.',
      accessor: 'production',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Всего добыто, млн.т.',
      accessor: 'total',
      align: 'right',
      sortable: true,
    },
  ],
  rows,
  filters,
};

const badgeParams: React.ComponentProps<typeof Badge> = {
  view: 'filled',
  minified: true,
  size: 'm',
};

const tableWithTrafficLightDataRows = [
  {
    id: 'row1',
    field: 'Северный бур',
    sum: 20,
    status: <Badge {...badgeParams} status="normal" />,
    statusOrder: 1,
  },
  {
    id: 'row2',
    field: 'Южное месторождение',
    sum: 15,
    status: <Badge {...badgeParams} status="warning" />,
    statusOrder: 2,
  },
  {
    id: 'row3',
    field: 'Западный разлом',
    sum: 7,
    status: <Badge {...badgeParams} status="error" />,
    statusOrder: 3,
  },
  {
    id: 'row4',
    field: 'Восточный разлом',
    sum: 1,
    status: <Badge {...badgeParams} status="normal" />,
    statusOrder: 1,
  },
];

export const tableWithBagdeData: TableProps<typeof tableWithTrafficLightDataRows[number]> = {
  columns: [
    {
      title: 'Локация',
      accessor: 'field',
      align: 'left',
      sortable: true,
    },
    {
      title: 'Сумма скважин без МГРП',
      accessor: 'sum',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Статус',
      accessor: 'status',
      align: 'center',
      sortable: true,
      sortByField: 'statusOrder',
    },
  ],
  rows: tableWithTrafficLightDataRows,
  filters: [
    {
      id: 'fieldNorthDrill',
      name: 'Северный бур',
      filterer: (value: string) => value === 'Северный бур',
      field: 'field',
    },
    {
      id: 'fieldSouthWell',
      name: 'Южное месторождение',
      filterer: (value: string) => value === 'Южное месторождение',
      field: 'field',
    },
    {
      id: 'fieldWestCrack',
      name: 'Западный разлом',
      filterer: (value: string) => value === 'Западный разлом',
      field: 'field',
    },

    {
      id: 'sumLess10',
      name: 'Менее 10',
      filterer: (value: number | string) => Number(value) < 10,
      field: 'sum',
    },
    {
      id: 'sumFrom10To20',
      name: 'От 10 (вкл.) до 20 (не вкл.)',
      filterer: (value: number | string) => Number(value) >= 10 && Number(value) < 20,
      field: 'sum',
    },
    {
      id: 'sum20AndMore',
      name: '20 и более',
      filterer: (value: number | string) => Number(value) >= 20,
      field: 'sum',
    },
  ],
};
