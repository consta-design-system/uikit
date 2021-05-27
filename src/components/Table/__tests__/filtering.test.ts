import {
  fieldFiltersPresent,
  Filters,
  filterTableData,
  getOptionsForFilters,
  getSelectedFiltersInitialState,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
} from '../filtering';
import { TableColumn } from '../Table';

const DATA = [
  {
    id: 'row1',
    count: 150,
    price: 50,
  },
  {
    id: 'row2',
    count: 100,
    price: 150,
  },
  {
    id: 'row3',
    count: 50,
    price: 100,
  },
];

type Row = typeof DATA[number];

const COUNT_FILTERS: Filters<Row> = [
  {
    id: 'countLess100',
    name: 'Количество меньше 100',
    field: 'count',
    filterer: (value: number) => value < 100,
  },
  {
    id: 'countEqual100',
    name: 'Количество равно 100',
    field: 'count',
    filterer: (value: number) => value === 100,
  },
  {
    id: 'countMore100',
    name: 'Количество больше 100',
    field: 'count',
    filterer: (value: number) => value > 100,
  },
  {
    id: 'countEqual0',
    name: 'Количество равно 0',
    field: 'count',
    filterer: (value: number) => value === 0,
  },
  {
    id: 'countUndefined',
    name: 'Количество неизвестно',
    field: 'count',
    filterer: (value: number) => value === undefined,
  },
];

const PRICE_FILTERS: Filters<Row> = [
  {
    id: 'priceLess100',
    name: 'Цена меньше 100',
    field: 'price',
    filterer: (value: number) => value < 100,
  },
  {
    id: 'priceEqual100',
    name: 'цена равна 100',
    field: 'price',
    filterer: (value: number) => value === 100,
  },
  {
    id: 'priceMore100',
    name: 'Цена больше 100',
    field: 'price',
    filterer: (value: number) => value > 100,
  },
];

const FILTERS: Filters<Row> = [...COUNT_FILTERS, ...PRICE_FILTERS];

describe('fieldFiltersPresent', () => {
  it('возвращает false если фильтр с таким полем не существует', () => {
    expect(fieldFiltersPresent(FILTERS, 'name')).toEqual(false);
  });

  it('возвращает true если фильтр с таким полем существует', () => {
    expect(fieldFiltersPresent(FILTERS, 'count')).toEqual(true);
  });
});

describe('filterTableData', () => {
  it('возвращает исходные данные, если не выбраны фильтры', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {},
      }),
    ).toEqual(DATA);
  });

  it('не возвращает ничего при фильтрах за пределами данных', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countEqual0'],
          },
        },
      }),
    ).toEqual([]);
  });

  it('фильтрует по одной строке', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countLess100'],
          },
        },
      }),
    ).toEqual([DATA[2]]);
  });

  it('фильтрует внутри столбцов по ИЛИ', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countLess100', 'countMore100'],
          },
        },
      }),
    ).toEqual([DATA[0], DATA[2]]);
  });

  it('фильтрует по двум строкам', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countEqual100'],
          },
          price: {
            selected: ['priceMore100'],
          },
        },
      }),
    ).toEqual([DATA[1]]);
  });

  it('не возвращает ничего если среди фильтров отсутствует выбранный', () => {
    expect(
      filterTableData({
        data: DATA,
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['UNDEFINED'],
          },
        },
      }),
    ).toEqual([]);
  });
});

describe('getOptionsForFilters', () => {
  it('возвращает пустой массив, если список фильтров пуст', () => {
    expect(getOptionsForFilters([], 'count')).toEqual([]);
  });

  it('возвращает пустой массив, если фильтров для поля нет', () => {
    expect(getOptionsForFilters(FILTERS, 'name')).toEqual([]);
  });

  it('возвращает массив с фильтрами для выбранного поля', () => {
    expect(getOptionsForFilters(FILTERS, 'count')).toEqual([
      {
        label: 'Количество меньше 100',
        value: 'countLess100',
      },
      {
        label: 'Количество равно 100',
        value: 'countEqual100',
      },
      {
        label: 'Количество больше 100',
        value: 'countMore100',
      },
      {
        label: 'Количество равно 0',
        value: 'countEqual0',
      },
      {
        label: 'Количество неизвестно',
        value: 'countUndefined',
      },
    ]);
  });
});

describe('getSelectedFiltersInitialState', () => {
  it('возвращает пустой список фильтров и их значений, если ничего не было передано', () => {
    expect(getSelectedFiltersInitialState()).toEqual({});
  });

  it('возвращает начальное состояние для каждого типа фильтра', () => {
    expect(getSelectedFiltersInitialState(FILTERS)).toEqual({
      count: {
        selected: [],
      },
      price: {
        selected: [],
      },
    });
  });
});

describe('getSelectedFiltersList', () => {
  const COLUMNS: TableColumn<Row>[] = [
    { title: 'Количество', accessor: 'count' },
    { title: 'Цена', accessor: 'price' },
  ];

  it('возвращает пустой массив, если нет выбранных фильтров', () => {
    expect(
      getSelectedFiltersList({
        filters: FILTERS,
        selectedFilters: {},
        columns: COLUMNS,
      }),
    ).toEqual([]);
  });

  it('возвращает массив с выбранными фильтрами для одного поля', () => {
    expect(
      getSelectedFiltersList({
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countLess100'],
          },
        },
        columns: COLUMNS,
      }),
    ).toEqual([
      {
        id: 'countLess100',
        name: 'Количество меньше 100',
      },
    ]);
  });

  it('возвращает массив с выбранными фильтрами для двух полей', () => {
    expect(
      getSelectedFiltersList({
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['countLess100'],
          },
          price: {
            selected: ['priceLess100'],
          },
        },
        columns: COLUMNS,
      }),
    ).toEqual([
      {
        id: 'countLess100',
        name: 'Количество меньше 100',
      },
      {
        id: 'priceLess100',
        name: 'Цена меньше 100',
      },
    ]);
  });

  it('возвращает пустой массив если такого фильтра для поля не существует', () => {
    expect(
      getSelectedFiltersList({
        filters: FILTERS,
        selectedFilters: {
          count: {
            selected: ['UNDEFINED'],
          },
        },
        columns: COLUMNS,
      }),
    ).toEqual([]);
  });
});

describe('isSelectedFiltersPresent', () => {
  it('возвращает false если не выбран ни один фильтр', () => {
    expect(
      isSelectedFiltersPresent({
        count: {
          selected: [],
        },
        price: {
          selected: [],
        },
      }),
    ).toEqual(false);
  });

  it('возвращает true если выбран фильтр для одного из полей', () => {
    expect(
      isSelectedFiltersPresent({
        count: {
          selected: ['countLess100'],
        },
        price: {
          selected: [],
        },
      }),
    ).toEqual(true);
  });

  it('возвращает true если выбраны фильтры для всех полей', () => {
    expect(
      isSelectedFiltersPresent({
        count: {
          selected: ['countLess100'],
        },
        price: {
          selected: ['priceEqual100'],
        },
      }),
    ).toEqual(true);
  });
});
