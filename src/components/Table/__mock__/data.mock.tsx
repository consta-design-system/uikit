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

export const tableWithMultiLevelHeadersData = {
  columns: [
    {
      title: 'Месторождение',
      columns: [
        {
          title: 'Вес общий',
          columns: [
            {
              title: 'Вес, г.',
              accessor: 'weightG',
              align: 'center',
            },
            {
              title: 'Вес, кг.',
              accessor: 'weightKg',
              align: 'center',
            },
          ],
        },
        {
          title: 'Год',
          accessor: 'year',
          align: 'center',
        },
        {
          title: 'Распределение',
          accessor: 'distribution',
          align: 'left',
        },
      ],
    },
    {
      title: 'Отправка',
      accessor: 'dispatch',
      align: 'left',
    },
    {
      title: 'Приход',
      accessor: 'arrival',
      align: 'left',
    },
    {
      title: 'Ответственный',
      columns: [
        {
          title: 'Смена 1',
          accessor: 'responsible1',
          align: 'left',
        },
        {
          title: 'Смена 2',
          accessor: 'responsible2',
          align: 'left',
          sortable: true,
        },
      ],
    },
  ],
  rows: [
    {
      id: 'row1',
      weightG: '1.398',
      weightKg: '~ 0',
      year: 2007,
      distribution: 'Отсутствует',
      dispatch: '12.09.2020',
      arrival: '18.09.2020',
      responsible1: 'Иванов И.И.',
      responsible2: 'Сидоров И.И.',
    },
    {
      id: 'row2',
      weightG: '2.398',
      weightKg: '~ 0',
      year: 2017,
      distribution: 'В процессе',
      dispatch: '1.09.2020',
      arrival: '8.09.2020',
      responsible1: 'Иванов П.П.',
      responsible2: 'Петров П.П.',
    },
    {
      id: 'row3',
      weightG: '3.398',
      weightKg: 'до 1',
      year: 2020,
      distribution: 'В процессе',
      dispatch: '11.09.2020',
      arrival: '28.10.2020',
      responsible1: 'Сидоров С.С.',
      responsible2: 'Иванов С.С.',
    },
    {
      id: 'row4',
      weightG: '4.398',
      weightKg: 'до 10',
      year: 2010,
      distribution: 'Есть',
      dispatch: '9.09.2020',
      arrival: '13.09.2020',
      responsible1: 'Петров И.И.',
      responsible2: 'Иванов И.И.',
    },
    {
      id: 'row5',
      weightG: '1.398',
      weightKg: '~ 0',
      year: 2007,
      distribution: 'Отсутствует',
      dispatch: '12.09.2020',
      arrival: '18.09.2020',
      responsible1: 'Иванов И.И.',
      responsible2: 'Сидоров И.И.',
    },
    {
      id: 'row6',
      weightG: '2.398',
      weightKg: '~ 0',
      year: 2017,
      distribution: 'В процессе',
      dispatch: '1.09.2020',
      arrival: '8.09.2020',
      responsible1: 'Иванов П.П.',
      responsible2: 'Петров П.П.',
    },
    {
      id: 'row7',
      weightG: '3.398',
      weightKg: 'до 1',
      year: 2020,
      distribution: 'В процессе',
      dispatch: '11.09.2020',
      arrival: '28.10.2020',
      responsible1: 'Сидоров С.С.',
      responsible2: 'Иванов С.С.',
    },
    {
      id: 'row8',
      weightG: '4.398',
      weightKg: 'до 10',
      year: 2010,
      distribution: 'Есть',
      dispatch: '9.09.2020',
      arrival: '13.09.2020',
      responsible1: 'Петров И.И.',
      responsible2: 'Иванов И.И.',
    },
  ],
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

export const COLUMNS = [
  {
    title: 'Месторождение',
    columns: [
      {
        title: 'Вес общий',
        columns: [
          {
            title: 'Вес, г.',
            accessor: 'weightG',
            align: 'center',
          },
          {
            title: 'Вес, кг.',
            accessor: 'weightKg',
            align: 'center',
          },
        ],
      },
      {
        title: 'Год',
        accessor: 'year',
        align: 'center',
      },
      {
        title: 'Распределение',
        accessor: 'distribution',
        align: 'left',
      },
    ],
  },
  {
    title: 'Отправка',
    accessor: 'dispatch',
    align: 'left',
  },
  {
    title: 'Приход',
    accessor: 'arrival',
    align: 'left',
  },
  {
    title: 'Ответственный',
    columns: [
      {
        title: 'Смена 1',
        accessor: 'responsible1',
        align: 'left',
      },
      {
        title: 'Смена 2',
        accessor: 'responsible2',
        align: 'left',
        sortable: true,
      },
    ],
  },
];

export const TRANSFORMED_COLUMNS = [
  [
    {
      title: 'Месторождение',
      columns: [
        {
          title: 'Вес общий',
          columns: [
            { title: 'Вес, г.', accessor: 'weightG', align: 'center' },
            { title: 'Вес, кг.', accessor: 'weightKg', align: 'center' },
          ],
        },
        { title: 'Год', accessor: 'year', align: 'center' },
        { title: 'Распределение', accessor: 'distribution', align: 'left' },
      ],
      position: { colSpan: 4, topHeaderGridIndex: 0, gridIndex: 0, level: 0 },
    },
    {
      title: 'Отправка',
      accessor: 'dispatch',
      align: 'left',
      position: { topHeaderGridIndex: 1, gridIndex: 4, rowSpan: 3, level: 0 },
    },
    {
      title: 'Приход',
      accessor: 'arrival',
      align: 'left',
      position: { topHeaderGridIndex: 2, gridIndex: 5, rowSpan: 3, level: 0 },
    },
    {
      title: 'Ответственный',
      columns: [
        { title: 'Смена 1', accessor: 'responsible1', align: 'left' },
        { title: 'Смена 2', accessor: 'responsible2', align: 'left', sortable: true },
      ],
      position: { colSpan: 2, topHeaderGridIndex: 3, gridIndex: 6, level: 0 },
    },
  ],
  [
    {
      title: 'Вес общий',
      columns: [
        { title: 'Вес, г.', accessor: 'weightG', align: 'center' },
        { title: 'Вес, кг.', accessor: 'weightKg', align: 'center' },
      ],
      position: { colSpan: 2, topHeaderGridIndex: 0, gridIndex: 0, level: 1 },
    },
    {
      title: 'Год',
      accessor: 'year',
      align: 'center',
      position: { topHeaderGridIndex: 0, gridIndex: 2, rowSpan: 2, level: 1 },
    },
    {
      title: 'Распределение',
      accessor: 'distribution',
      align: 'left',
      position: { topHeaderGridIndex: 0, gridIndex: 3, rowSpan: 2, level: 1 },
    },
    {
      title: 'Смена 1',
      accessor: 'responsible1',
      align: 'left',
      position: { topHeaderGridIndex: 3, gridIndex: 4, rowSpan: 2, level: 1 },
    },
    {
      title: 'Смена 2',
      accessor: 'responsible2',
      align: 'left',
      sortable: true,
      position: { topHeaderGridIndex: 3, gridIndex: 5, rowSpan: 2, level: 1 },
    },
  ],
  [
    {
      title: 'Вес, г.',
      accessor: 'weightG',
      align: 'center',
      position: { topHeaderGridIndex: 0, gridIndex: 0, rowSpan: 1, level: 2 },
    },
    {
      title: 'Вес, кг.',
      accessor: 'weightKg',
      align: 'center',
      position: { topHeaderGridIndex: 0, gridIndex: 1, rowSpan: 1, level: 2 },
    },
  ],
];

export const generateData = (rowsCount: number, columnsCount: number) => {
  const rows = [];
  const columns = [];

  for (let i = 1; i <= columnsCount; i++) {
    columns.push({
      title: `заголовок ${i}`,
      accessor: `column${i}`,
    });
  }

  for (let i = 1; i <= rowsCount; i++) {
    const row: { id: string; [key: string]: string } = { id: `${i}` };

    for (let j = 1; j <= columnsCount; j++) {
      row[`column${j}`] = `строка_${i} столбец_${j}`;
    }

    rows.push(row);
  }

  return { rows, columns };
};
