import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import React from 'react';

import { cn } from '../../../utils/bem';
import { isNotNil } from '../../../utils/type-guards';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { TableChoiceGroupFilter } from '../ChoiceGroupFilter/TableChoiceGroupFilter';
import { TableNumberFilter } from '../NumberFilter/TableNumberFilter';
import { TableFilters as Filters, TableProps } from '../Table';
import { TableTextFilter } from '../TextFilter/TableTextFilter';

export const rangeFilterer = (
  value: number | string,
  filterValue: { min: number | string; max: number | string },
): boolean => {
  const minDefined = isNotNil(filterValue.min);
  const maxDefined = isNotNil(filterValue.max);

  if (minDefined && !maxDefined) {
    return Number(value) >= Number(filterValue.min);
  }

  if (!minDefined && maxDefined) {
    return Number(value) <= Number(filterValue.max);
  }

  if (!(minDefined || maxDefined)) {
    return true;
  }

  return (
    Number(value) <= Number(filterValue.max) &&
    Number(value) >= Number(filterValue.min)
  );
};

export const rows = [
  {
    id: 'row1',
    field: 'Северное',
    year: 1982,
    type: 'Нефть',
    estimatedReserves: 5000,
    remainingReserves: 1700,
    production: 33,
    total: 313,
  },
  {
    id: 'row2',
    field: 'Южное',
    year: 2001,
    type: 'Конденсат',
    estimatedReserves: 7540,
    remainingReserves: 7540,
    production: 363,
    total: 88,
  },
  {
    id: 'row3',
    field: 'Западное',
    year: 1985,
    type: 'Комбинированное',
    estimatedReserves: 8766,
    remainingReserves: 3374,
    production: 256,
    total: 434,
  },
  {
    id: 'row4',
    field: 'Восточное',
    year: 1989,
    type: 'Конденсат',
    estimatedReserves: 1697,
    remainingReserves: 4818,
    production: 250,
    total: 236,
  },
  {
    id: 'row5',
    field: 'Центральное',
    year: 1997,
    type: 'Нефть',
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
    filterer: (value) => value > 2018,
    field: 'year',
  },
  {
    id: 'olderThan2000',
    name: 'Старше 2000 года',
    filterer: (value) => value > 2000,
    field: 'year',
  },
  {
    id: 'inRangeOf90s',
    name: 'Датируемые 90-ми годами',
    filterer: (value) => value >= 1990 && value <= 1999,
    field: 'year',
  },
  {
    id: 'equalOrOlder80s',
    name: 'Датируемые 80-ми годами и старше',
    filterer: (value) => value <= 1989,
    field: 'year',
  },
  {
    id: 'oil',
    name: 'Нефть',
    filterer: (value: string) => value === 'Нефть',
    field: 'type',
  },
  {
    id: 'condensated',
    name: 'Конденсат',
    filterer: (value: string) => value === 'Конденсат',
    field: 'type',
  },
  {
    id: 'combined',
    name: 'Комбинированное',
    filterer: (value) => value === 'Комбинированное',
    field: 'type',
  },
  {
    id: 'priobskoye',
    name: 'Северное',
    filterer: (value: string) => value === 'Северное',
    field: 'field',
  },
  {
    id: 'urengoyskoye',
    name: 'Южное',
    filterer: (value: string) => value === 'Южное',
    field: 'field',
  },
  {
    id: 'krasnoleninskaya',
    name: 'Западное',
    filterer: (value: string) => value === 'Западное',
    field: 'field',
  },
  {
    id: 'velikoye',
    name: 'Восточное',
    filterer: (value: string) => value === 'Восточное',
    field: 'field',
  },
  {
    id: 'rusGasoil',
    name: 'Центральное',
    filterer: (value: string) => value === 'Центральное',
    field: 'field',
  },
  {
    id: 'estimatedReservesLessThan1000',
    name: 'Меньше 1000',
    filterer: (value) => value < 1000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReservesFrom1000To5000',
    name: 'От 1000 (вкл.) до 5000 (не вкл.)',
    filterer: (value) => value >= 1000 && value < 5000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReservesFrom5000To8000',
    name: 'От 5000 (вкл.) до 8000 (не вкл.)',
    filterer: (value) => value >= 5000 && value < 8000,
    field: 'estimatedReserves',
  },
  {
    id: 'estimatedReserves8000AndMore',
    name: '8000 и более',
    filterer: (value) => value >= 8000,
    field: 'estimatedReserves',
  },
  {
    id: 'remainingReservesLessThan1000',
    name: 'Меньше 1000',
    filterer: (value) => value < 1000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReservesFrom1000To5000',
    name: 'От 1000 (вкл.) до 5000 (не вкл)',
    filterer: (value) => value >= 1000 && value < 5000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReservesFrom5000To8000',
    name: 'От 5000 (вкл.) до 8000 (не вкл)',
    filterer: (value) => value >= 5000 && value < 8000,
    field: 'remainingReserves',
  },
  {
    id: 'remainingReserves8000AndMore',
    name: '8000 и более',
    filterer: (value) => value >= 8000,
    field: 'remainingReserves',
  },
  {
    id: 'productionLessThan100',
    name: 'Меньше 100',
    filterer: (value) => value < 100,
    field: 'production',
  },
  {
    id: 'productionFrom100To200',
    name: 'От 100 (вкл.) до 200 (не вкл.)',
    filterer: (value) => value >= 100 && value < 200,
    field: 'production',
  },
  {
    id: 'productionFrom200To300',
    name: 'От 200 (вкл.) до 300 (не вкл.)',
    filterer: (value) => value >= 200 && value < 300,
    field: 'production',
  },
  {
    id: 'productionMoreThan300',
    name: '300 и более',
    filterer: (value) => value >= 300,
    field: 'production',
  },
  {
    id: 'totalLessThan100',
    name: 'Меньше 100',
    filterer: (value) => value < 100,
    field: 'total',
  },
  {
    id: 'totalFrom100To200',
    name: 'От 100 (вкл.) до 200 (не вкл.)',
    filterer: (value) => value >= 100 && value < 200,
    field: 'total',
  },
  {
    id: 'totalFrom200To300',
    name: 'От 200 (вкл.) до 300 (не вкл.)',
    filterer: (value) => value >= 200 && value < 300,
    field: 'total',
  },
  {
    id: 'totalMoreThan300',
    name: '300 и более',
    filterer: (value) => value >= 300,
    field: 'total',
  },
];

export const customFilters: Filters<typeof rows[number]> = [
  {
    id: 'field',
    name: 'Месторождение: ',
    field: 'field',
    filterer: (
      cellValue,
      filterValues: Array<{ value: string; name: string }>,
    ) => {
      return filterValues.some(
        (filterValue) => filterValue && filterValue.value === cellValue,
      );
    },
    component: {
      name: TableTextFilter,
      props: {
        withSearch: true,
        items: [
          { name: 'Северное', value: 'Северное' },
          { name: 'Южное', value: 'Южное' },
          { name: 'Западное', value: 'Западное' },
          { name: 'Восточное', value: 'Восточное' },
          { name: 'Центральное', value: 'Центральное' },
        ],
      },
    },
  },
  {
    id: 'years',
    name: 'Диапазон лет: ',
    filterer: rangeFilterer,
    field: 'year',
    component: {
      name: TableNumberFilter,
    },
  },
  {
    id: 'oil',
    name: 'Нефть',
    filterer: (value: string) => value === 'Нефть',
    field: 'type',
  },
  {
    id: 'condensated',
    name: 'Конденсат',
    filterer: (value: string) => value === 'Конденсат',
    field: 'type',
  },
  {
    id: 'combined',
    name: 'Комбинированное',
    filterer: (value: string) => value === 'Комбинированное',
    field: 'type',
  },
  {
    id: 'reserves',
    name: 'Запасы: ',
    field: 'estimatedReserves',
    filterer: (cellValue, filterValue: { name: string; value: number }) => {
      if (!isNotNil(filterValue.value)) {
        return true;
      }

      return cellValue > filterValue.value;
    },
    component: {
      name: TableChoiceGroupFilter,
      props: {
        items: [{ name: '> 5k', value: 5000 }],
      },
    },
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
      align: 'left',
    },
    {
      title: 'Полные запасы, млн. т.',
      accessor: 'estimatedReserves',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Остаточные извлекаемые запасы, млн. т.',
      accessor: 'remainingReserves',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Добыча тыс. т/сут.',
      accessor: 'production',
      align: 'right',
      sortable: true,
    },
    {
      title: 'Всего добыто, млн. т.',
      accessor: 'total',
      align: 'right',
      sortable: true,
    },
  ],
  rows,
  filters,
};

const rowsForMultiLevelHeadersData = [
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
    weightKg: '~ 0',
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
    responsible1: 'Петров И.И.',
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
    responsible1: 'Петров И.И.',
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
];

const expandableRowsData = [
  {
    id: 'row1',
    field: 'Северное',
    year: 1982,
    type: 'Нефть',
    estimatedReserves: 5000,
    remainingReserves: 1700,
    production: 33,
    total: 313,
    rows: [
      {
        id: 'row1.1',
        field: 'Северо-Западное',
        year: 1985,
        type: 'Конденсат',
        estimatedReserves: 2000,
        remainingReserves: 1300,
        production: 320,
        total: 143,
      },
      {
        id: 'row1.2',
        field: 'Северо-Восточное',
        year: 1983,
        type: 'Конденсат',
        estimatedReserves: 3000,
        remainingReserves: 1000,
        production: 310,
        total: 140,
      },
    ],
  },
  {
    id: 'row2',
    field: 'Южное',
    year: 2001,
    type: 'Конденсат',
    estimatedReserves: 7540,
    remainingReserves: 7540,
    production: 363,
    total: 88,
  },
  {
    id: 'row3',
    field: 'Западное',
    year: 1985,
    type: 'Комбинированное',
    estimatedReserves: 8766,
    remainingReserves: 3374,
    production: 256,
    total: 434,
  },
  {
    id: 'row4',
    field: 'Восточное',
    year: 1989,
    type: 'Конденсат',
    estimatedReserves: 1697,
    remainingReserves: 4818,
    production: 321,
    total: 236,
    rows: [
      {
        id: 'row4.1',
        field: 'Восточное-1',
        year: 1989,
        type: 'Конденсат',
        estimatedReserves: 1697,
        remainingReserves: 4818,
        production: 452,
        total: 819,
      },
      {
        id: 'row4.2',
        field: 'Восточное-2',
        year: 1989,
        type: 'Конденсат',
        estimatedReserves: 680,
        remainingReserves: 5321,
        production: 90,
        total: 112,
        rows: [
          {
            id: 'row4.2.1',
            field: 'Восточное-3',
            year: 1989,
            type: 'Конденсат',
            estimatedReserves: 1203,
            remainingReserves: 9832,
            production: 511,
            total: 295,
            rows: [
              {
                id: 'row4.2.1.1',
                field: 'Восточное-8',
                year: 1989,
                type: 'Конденсат',
                estimatedReserves: 1203,
                remainingReserves: 9832,
                production: 293,
                total: 222,
              },
              {
                id: 'row4.2.1.2',
                field: 'Восточное-7',
                year: 1993,
                type: 'Нефть',
                estimatedReserves: 1203,
                remainingReserves: 9832,
                production: 250,
                total: 236,
              },
            ],
          },
          {
            id: 'row4.2.2',
            field: 'Восточное-4',
            year: 2001,
            type: 'Нефть',
            estimatedReserves: 2121,
            remainingReserves: 1253,
            production: 411,
            total: 334,
          },
        ],
      },
    ],
  },
  {
    id: 'row5',
    field: 'Центральное',
    year: 1997,
    type: 'Нефть',
    estimatedReserves: 5169,
    remainingReserves: 3712,
    production: 292,
    total: 417,
  },
];

export const tableWithExpandableRowsData = {
  rows: expandableRowsData,
  borderBetweenRows: true,
};

export const tableWithMultiLevelHeadersData: TableProps<
  typeof rowsForMultiLevelHeadersData[number]
> = {
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
  rows: rowsForMultiLevelHeadersData,
};

const badgeParams: React.ComponentProps<typeof Badge> = {
  view: 'filled',
  minified: true,
  size: 'm',
};

const tableWithTrafficLightDataRows = [
  {
    id: 'row1',
    field: 'Cеверный разлом',
    sum: 20,
    status: <Badge {...badgeParams} status="normal" />,
    statusOrder: 1,
  },
  {
    id: 'row2',
    field: 'Южный разлом',
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

export const tableWithBagdeData: TableProps<
  typeof tableWithTrafficLightDataRows[number]
> = {
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
      filterer: (value) => value === 'Северный бур',
      field: 'field',
    },
    {
      id: 'fieldSouthWell',
      name: 'Южное месторождение',
      filterer: (value) => value === 'Южное месторождение',
      field: 'field',
    },
    {
      id: 'fieldWestCrack',
      name: 'Западный разлом',
      filterer: (value) => value === 'Западный разлом',
      field: 'field',
    },

    {
      id: 'sumLess10',
      name: 'Менее 10',
      filterer: (value) => value < 10,
      field: 'sum',
    },
    {
      id: 'sumFrom10To20',
      name: 'От 10 (вкл.) до 20 (не вкл.)',
      filterer: (value) => value >= 10 && value < 20,
      field: 'sum',
    },
    {
      id: 'sum20AndMore',
      name: '20 и более',
      filterer: (value) => value >= 20,
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
      colId: 0,
      position: { colSpan: 4, topHeaderGridIndex: 0, gridIndex: 0, level: 0 },
    },
    {
      title: 'Отправка',
      accessor: 'dispatch',
      align: 'left',
      colId: 6,
      position: { topHeaderGridIndex: 1, gridIndex: 4, rowSpan: 3, level: 0 },
    },
    {
      title: 'Приход',
      accessor: 'arrival',
      align: 'left',
      colId: 7,
      position: { topHeaderGridIndex: 2, gridIndex: 5, rowSpan: 3, level: 0 },
    },
    {
      title: 'Ответственный',
      colId: 8,
      columns: [
        { title: 'Смена 1', accessor: 'responsible1', align: 'left' },
        {
          title: 'Смена 2',
          accessor: 'responsible2',
          align: 'left',
          sortable: true,
        },
      ],
      position: { colSpan: 2, topHeaderGridIndex: 3, gridIndex: 6, level: 0 },
    },
  ],
  [
    {
      title: 'Вес общий',
      colId: 1,
      columns: [
        { title: 'Вес, г.', accessor: 'weightG', align: 'center' },
        { title: 'Вес, кг.', accessor: 'weightKg', align: 'center' },
      ],
      parentId: 0,
      position: { colSpan: 2, topHeaderGridIndex: 0, gridIndex: 0, level: 1 },
    },
    {
      title: 'Год',
      accessor: 'year',
      align: 'center',
      colId: 2,
      parentId: 0,
      position: { topHeaderGridIndex: 0, gridIndex: 2, rowSpan: 2, level: 1 },
    },
    {
      title: 'Распределение',
      accessor: 'distribution',
      align: 'left',
      colId: 3,
      parentId: 0,
      position: { topHeaderGridIndex: 0, gridIndex: 3, rowSpan: 2, level: 1 },
    },
    {
      title: 'Смена 1',
      accessor: 'responsible1',
      align: 'left',
      colId: 9,
      parentId: 8,
      position: { topHeaderGridIndex: 3, gridIndex: 4, rowSpan: 2, level: 1 },
    },
    {
      title: 'Смена 2',
      accessor: 'responsible2',
      align: 'left',
      sortable: true,
      colId: 10,
      parentId: 8,
      position: { topHeaderGridIndex: 3, gridIndex: 5, rowSpan: 2, level: 1 },
    },
  ],
  [
    {
      title: 'Вес, г.',
      accessor: 'weightG',
      align: 'center',
      colId: 4,
      parentId: 1,
      position: { topHeaderGridIndex: 0, gridIndex: 0, rowSpan: 1, level: 2 },
    },
    {
      title: 'Вес, кг.',
      accessor: 'weightKg',
      align: 'center',
      colId: 5,
      parentId: 1,
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

export const tableWithMergedCellsData = {
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
      mergeCells: true,
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
      title: 'Смена 1',
      accessor: 'responsible1',
      align: 'left',
      mergeCells: true,
    },
    {
      title: 'Смена 2',
      accessor: 'responsible2',
      align: 'left',
      sortable: true,
      mergeCells: true,
    },
  ],
  rows: rowsForMultiLevelHeadersData,
};

const rowsWithObjectFields = [
  {
    id: 'row1',
    field: 'Приобское',
    year: {
      value: 1982,
    },
    type: 'Нефтяное',
    estimatedReserves: 5000,
    remainingReserves: 1700,
    production: 33,
    total: 313,
  },
  {
    id: 'row2',
    field: 'Уренгойское газонефтеконденсат­ное',
    year: {
      value: 2001,
    },
    type: 'Конденсатное',
    estimatedReserves: 7540,
    remainingReserves: 7540,
    production: 363,
    total: 88,
  },
  {
    id: 'row3',
    field: 'Красноленинская группа',
    year: {
      value: 1985,
    },
    type: 'Комбинированное',
    estimatedReserves: 8766,
    remainingReserves: 3374,
    production: 256,
    total: 434,
  },
  {
    id: 'row4',
    field: 'Великое',
    year: {
      value: 1989,
    },
    type: 'Конденсатное',
    estimatedReserves: 1697,
    remainingReserves: 4818,
    production: 250,
    total: 236,
  },
  {
    id: 'row5',
    field: 'Русское газонефтяное',
    year: {
      value: 1997,
    },
    type: 'Нефтяное',
    estimatedReserves: 5169,
    remainingReserves: 3712,
    production: 292,
    total: 417,
  },
];

export const tableDataWithRenderFn: TableProps<
  typeof rowsWithObjectFields[number]
> = {
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
      sortFn: (a, b): number => a.value - b.value,
      renderCell: (row): React.ReactNode => {
        return <h2>{row.year.value}</h2>;
      },
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
  rows: rowsWithObjectFields,
  filters: [
    {
      id: 'olderThan2018',
      name: 'Старше 2018 года',
      filterer: (data) => data.value > 2018,
      field: 'year',
    },
    {
      id: 'olderThan2000',
      name: 'Старше 2000 года',
      filterer: (data) => data.value > 2000,
      field: 'year',
    },
    {
      id: 'inRangeOf90s',
      name: 'Датируемые 90-ми годами',
      filterer: (data) => data.value >= 1990 && data.value <= 1999,
      field: 'year',
    },
    {
      id: 'equalOrOlder80s',
      name: 'Датируемые 80-ми годами и старше',
      filterer: (data) => data.value <= 1989,
      field: 'year',
    },
    {
      id: 'remainingReservesLessThan1000',
      name: 'Меньше 1000',
      filterer: (value) => value < 1000,
      field: 'remainingReserves',
    },
    {
      id: 'remainingReservesFrom1000To5000',
      name: 'От 1000 (вкл.) до 5000 (не вкл)',
      filterer: (value) => value >= 1000 && value < 5000,
      field: 'remainingReserves',
    },
    {
      id: 'remainingReservesFrom5000To8000',
      name: 'От 5000 (вкл.) до 8000 (не вкл)',
      filterer: (value) => value >= 5000 && value < 8000,
      field: 'remainingReserves',
    },
    {
      id: 'remainingReserves8000AndMore',
      name: '8000 и более',
      filterer: (value) => value >= 8000,
      field: 'remainingReserves',
    },
  ],
};

const cnCustomCell = cn('CustomCell');

export const tableDataWithAdditionalClassName: TableProps<
  typeof rowsWithObjectFields[number]
> = {
  columns: [
    {
      title: 'Месторождение',
      accessor: 'field',
      align: 'left',
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
    },
    {
      title: 'Остаточные извлекаемые \nзапасы, млн.т.',
      accessor: 'remainingReserves',
      align: 'right',
    },
    {
      title: 'Добыча тыс.т/сут.',
      accessor: 'production',
      align: 'right',
      mergeCells: true,
    },
  ],
  rows: rowsWithObjectFields,
  getAdditionalClassName: ({ column, row, isActive }) =>
    cnCustomCell({
      darked: !isActive && row.type === 'Нефтяное' && !column.mergeCells,
    }),
};

const CustomIDs = {
  fullName: 'fullName',
  yearOfRegistration: 'yearOfRegistration',
};

export { CustomIDs };

export const rowsForCustomTagLabelFunction = [
  {
    id: 'row1',
    [CustomIDs.fullName]: 'Воронин Ян Фёдорович',
    [CustomIDs.yearOfRegistration]: 2000,
    phone: 79002332120,
  },
  {
    id: 'row2',
    [CustomIDs.fullName]: 'Иванов Иван Иванович',
    [CustomIDs.yearOfRegistration]: 2018,
    phone: 79002332120,
  },
  {
    id: 'row3',
    [CustomIDs.fullName]: 'Новиков Никита Максимович',
    [CustomIDs.yearOfRegistration]: 2021,
    phone: 79002332120,
  },
  {
    id: 'row4',
    [CustomIDs.fullName]: 'Крабов Виктор Дмитриевич',
    [CustomIDs.yearOfRegistration]: 2009,
    phone: 79002332120,
  },
];

export const partOfTableDataForCustomTagLabelFunction = {
  columns: [
    {
      title: 'Имя',
      accessor: CustomIDs.fullName,
      sortable: true,
    },
    {
      title: 'Год регистрации',
      accessor: CustomIDs.yearOfRegistration,
      sortable: true,
    },
  ],
  rows: rowsForCustomTagLabelFunction,
  filters: [
    {
      id: CustomIDs.fullName,
      name: 'Выбранные инициалы: ',
      field: CustomIDs.fullName,
      filterer: customFilters[0].filterer,
      component: {
        name: TableTextFilter,
        props: {
          withSearch: true,
          items: [
            {
              name: rowsForCustomTagLabelFunction[0].fullName,
              value: rowsForCustomTagLabelFunction[0].fullName,
            },
            {
              name: rowsForCustomTagLabelFunction[1].fullName,
              value: rowsForCustomTagLabelFunction[1].fullName,
            },
            {
              name: rowsForCustomTagLabelFunction[2].fullName,
              value: rowsForCustomTagLabelFunction[2].fullName,
            },
            {
              name: rowsForCustomTagLabelFunction[3].fullName,
              value: rowsForCustomTagLabelFunction[3].fullName,
            },
          ],
        },
      },
    },
    {
      id: CustomIDs.yearOfRegistration,
      name: 'Год регистрации: ',
      field: CustomIDs.yearOfRegistration,
      filterer: rangeFilterer,
      component: {
        name: TableNumberFilter,
      },
    },
  ],
};

export const withControlTableMock: TableProps<
  typeof rowsForCustomTagLabelFunction[number]
> = {
  columns: [
    {
      title: 'Имя',
      accessor: CustomIDs.fullName,
      sortable: true,
      align: 'right',
      control: () => (
        <Button
          size="xs"
          iconSize="s"
          view="clear"
          onlyIcon
          iconLeft={IconAdd}
        />
      ),
    },
    {
      title: 'Год регистрации',
      accessor: CustomIDs.yearOfRegistration,
      sortable: true,
      align: 'right',
      control: () => (
        <Button
          size="xs"
          iconSize="s"
          view="clear"
          onlyIcon
          iconLeft={IconRemove}
        />
      ),
    },
    {
      title: 'Телефон',
      align: 'right',
      accessor: 'phone',
      control: () => (
        <Button
          size="xs"
          iconSize="s"
          view="clear"
          onlyIcon
          iconLeft={IconAdd}
        />
      ),
    },
  ],
  rows: rowsForCustomTagLabelFunction,
  filters: [
    {
      id: CustomIDs.yearOfRegistration,
      name: 'Год регистрации: ',
      field: CustomIDs.yearOfRegistration,
      filterer: rangeFilterer,
      component: {
        name: TableNumberFilter,
      },
    },
  ],
};

export const withHiddenColumnTableMock: TableProps<
  typeof rowsForCustomTagLabelFunction[number]
> = {
  columns: [
    {
      title: 'Имя',
      accessor: CustomIDs.fullName,
      sortable: true,
    },
    {
      title: 'Год регистрации',
      accessor: CustomIDs.yearOfRegistration,
      sortable: true,
      hidden: true,
    },
  ],
  rows: rowsForCustomTagLabelFunction,
};

const rowsWithColSpan = [
  {
    id: 'row1',
    name: 'Граждане',
    street: undefined,
    building: undefined,
    age: undefined,
    number: undefined,
    gender: undefined,
    rows: [
      {
        id: 'row1.1',
        name: 'Иван',
        street: 'ул. Мира',
        building: 1,
        age: 32,
        number: 2033,
        gender: 'муж.',
      },
      {
        id: 'row1.2',
        name: 'Анна',
        age: 40,
        street: 'пл. Ленина',
        building: 3,
        number: 2035,
        gender: 'жен.',
      },
    ],
  },
];

export const withColSpan: TableProps<typeof rowsWithColSpan[number]> = {
  columns: [
    {
      title: 'Имя',
      accessor: 'name',
      align: 'left',
      width: 150,
    },
    {
      title: 'Возраст',
      accessor: 'age',
      align: 'center',
      renderCell: (row) => (row.rows ? '> 30' : row.age),
    },
    {
      title: 'Адрес',
      columns: [
        {
          title: 'Улица',
          accessor: 'street',
          align: 'left',
          colSpan: (row) => (row.rows ? 3 : 1),
          renderCell: (row) => (row.rows ? 'Ленинский район' : row.street),
        },
        {
          title: 'Дом',
          accessor: 'building',
          align: 'center',
        },
        {
          title: 'Квартира',
          accessor: 'number',
          align: 'center',
        },
      ],
    },
    {
      title: 'Пол',
      accessor: 'gender',
      align: 'left',
    },
  ],
  rows: rowsWithColSpan,
};
