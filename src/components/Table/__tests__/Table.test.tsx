import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Filters } from '../filtering';
import { Table, TableProps as Props } from '../Table';

const refTestID = 'table-test-ref' as const;

const rows = [
  {
    id: 'row1',
    count: 200,
    price: 300,
    date: {
      year: 2019,
    },
  },
  {
    id: 'row2',
    count: 150,
    price: 50,
    date: {
      year: 2020,
    },
  },
  {
    id: 'row3',
    count: 100,
    price: 150,
    date: {
      year: 2021,
    },
  },
];

const defaultFilters = [
  {
    id: 'price>50',
    name: 'Больше 50',
    filterer: (value) => value > 50,
    field: 'price',
  },
  {
    id: 'price>250',
    name: 'Больше 250',
    filterer: (value) => value > 250,
    field: 'price',
  },
  {
    id: 'price<100',
    name: 'Меньше 100',
    filterer: (value) => value < 100,
    field: 'price',
  },
  {
    id: 'count>100',
    name: 'Кол-во Больше 100',
    filterer: (value) => value > 100,
    field: 'count',
  },
] as Filters<Row>;

type Row = typeof rows[number];

const defaultProps: Props<Row> = {
  columns: [
    {
      accessor: 'price',
      title: 'Цена',
      mergeCells: true,
    },
    {
      accessor: 'count',
      title: 'Количество',
    },
    {
      accessor: 'date',
      title: 'Год',
      renderCell: (row) => <h1>Отображает {row.date.year} год</h1>,
      mergeCells: true,
      getComparisonValue: (cell) => cell.year,
    },
  ],
  rows,
  filters: defaultFilters,
};

function getRows() {
  return screen.getAllByRole('presentation');
}

const renderComponent = (props: Props<Row> = defaultProps) => {
  return render(<Table {...props} />);
};

const renderComponentWithRefAndAddAttr = (props: Props<Row> = defaultProps) => {
  const ref = { current: null } as React.RefObject<HTMLDivElement>;
  setTimeout(() => {
    if (ref.current) {
      ref.current.setAttribute('data-testid', refTestID);
    }
  }, 1000);
  return render(<Table {...props} ref={ref} />);
};

describe('Компонент Table', () => {
  it('должен рендериться без ошибок', () => {
    renderComponent();
  });

  describe('проверка props', () => {
    describe('отображает ячейку', () => {
      it('с значением "50"', () => {
        renderComponent();
        expect(screen.getByText('50')).toBeInTheDocument();
      });
    });

    describe('проверка рендер функции renderCell', () => {
      it('renderCell отображает значение', () => {
        renderComponent();
        expect(screen.getByText('Отображает 2021 год')).toBeInTheDocument();
        expect(screen.getByText('Отображает 2020 год').tagName).toBe('H1');
      });
    });

    describe('проверка работы добавления control', () => {
      it('control отображается корректно', () => {
        /** Добавляем нашу filterIcon */
        defaultProps.columns = defaultProps.columns.map((column) => {
          const cloneColumn = { ...column };

          cloneColumn.control = () => <div className="filterIcon">test</div>;

          return cloneColumn;
        });

        renderComponent(defaultProps);

        const filterIcons = screen.getAllByText('test', {
          selector: '.TableCell-Wrapper .filterIcon',
        });

        /** Проверяем, что корректно появились компоненты с filterIcon */
        expect(filterIcons.length > 0).toBeTruthy();
      });
    });

    describe('проверка объединения ячеек', () => {
      const rowsWithMergeCells = [
        {
          id: 'row1',
          count: 200,
          price: 300,
          date: {
            year: 2019,
          },
        },
        {
          id: 'row2',
          count: 150,
          price: 300,
          date: {
            year: 2020,
          },
        },
        {
          id: 'row3',
          count: 100,
          price: 150,
          date: {
            year: 2020,
          },
        },
      ];

      const propsWithMergeCells: Props<Row> = {
        ...defaultProps,
        rows: rowsWithMergeCells,
      };

      it('c простыми данными', () => {
        renderComponent({ ...propsWithMergeCells });
        expect(screen.getByText('Отображает 2020 год')).toBeInTheDocument();
        const countCellsWithNumber = screen.getAllByText('Отображает 2020 год');
        expect(countCellsWithNumber.length).toBe(1);
      });

      it('с объектами', () => {
        renderComponent({ ...propsWithMergeCells });
        expect(screen.getByText('300')).toBeInTheDocument();
        const countCellsWithObject = screen.getAllByText('300');
        expect(countCellsWithObject.length).toBe(1);
      });
    });

    describe('проверка ref', () => {
      it(`добавлен с помощью ref аттрибут "data-testid=${refTestID}"`, () => {
        jest.useFakeTimers();
        renderComponentWithRefAndAddAttr();
        jest.advanceTimersByTime(1000);
        expect(screen.queryByTestId(refTestID)).toBeInTheDocument();
      });
    });

    describe('проверка обработчика клика по строке onRowClick', () => {
      it('onRowClick возвращает id текущей строки и имеет event', () => {
        const onRowClick = jest.fn(
          ({ id, e }: { id: string; e: React.MouseEvent }) => [id, e],
        );
        renderComponent({ ...defaultProps, onRowClick });
        const nodeRows = getRows();
        nodeRows.forEach((row) => {
          fireEvent.click(row);
        });
        expect(onRowClick).toHaveBeenCalled();
        expect(onRowClick).toHaveBeenCalledTimes(rows.length);
        defaultProps.rows.forEach((row, i) => {
          expect(onRowClick.mock.calls[i][0]).toHaveProperty('id');
          expect(onRowClick.mock.calls[i][0]).toHaveProperty('e');
          expect(onRowClick.mock.calls[i][0].id).toEqual(row.id);
          expect(onRowClick.mock.results[i].value).toHaveLength(2);
        });
      });
    });
  });

  describe('Проверка работы фильтров', () => {
    const filterColumn = {
      accessor: 'price',
      title: 'Цена',
    };
    describe('Компонент с выбором фильтра работает', () => {
      const root = renderComponent({ ...defaultProps });
      const priceCell = screen.getByText(filterColumn.title, {
        selector: '.TableCell-Wrapper',
      });
      const buttonFilterPrice = priceCell.querySelector(
        '.TableCell-Wrapper .TableFilterTooltip-Button',
      );
      it('Кнопка фильтра существует', () => {
        expect(buttonFilterPrice).not.toBeNull();
      });

      fireEvent.click(buttonFilterPrice!);
      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      const correctFilters = defaultFilters
        .filter((f) => f.field === filterColumn.accessor)
        .map((f) => f.name);
      const optionsTexNodes = options.map((o) => o.textContent);

      it('Окно с выбором фильтров отобразилось корректно', () => {
        expect(options).toHaveLength(correctFilters.length);
        expect(optionsTexNodes).toEqual(correctFilters);
      });

      const targetOption = options[1];
      it('Целевой option имеет корректное значение', () => {
        expect(targetOption).toHaveValue(defaultFilters[1].id);
      });
      const select = screen.getByRole('listbox');
      fireEvent.change(select, { target: { value: targetOption.value } });

      expect(root.getAllByRole('presentation')).toHaveLength(1);
      expect(root.getByText('300')).toBeInTheDocument();
    });

    it('Фильтры без свойств id и field не отображаются', () => {
      const filters = [
        {
          name: 'Больше 50',
          filterer: (value) => value > 50,
          field: 'price',
        },
        {
          id: 'price>250',
          name: 'Больше 250',
          filterer: (value) => value > 250,
        },
        {
          id: 'price<100',
          name: 'Меньше 100',
          filterer: (value) => value < 100,
          field: 'price',
        },
      ] as Filters<Row>;

      renderComponent({ ...defaultProps, filters });
      const priceCell = screen.getByText(filterColumn.title, {
        selector: '.TableCell-Wrapper',
      });
      const buttonFilterPrice = priceCell.querySelector(
        '.TableCell-Wrapper .TableFilterTooltip-Button',
      );
      fireEvent.click(buttonFilterPrice!);
      const options = screen.getAllByRole('option');
      const correctFilters = filters
        .filter((f) => f.id && f.field)
        .map((f) => f.name);
      const optionsTexNodes = options.map((o) => o.textContent);
      expect(optionsTexNodes).toEqual(correctFilters);
    });

    it('Кнопка "Сбросить все фильтры" работает (вызывает onFiltersUpdate)', () => {
      const onFiltersUpdated = jest.fn(() => true);
      renderComponent({ ...defaultProps, onFiltersUpdated });
      const priceCell = screen.getByText(filterColumn.title, {
        selector: '.TableCell-Wrapper',
      });
      const buttonFilterPrice = priceCell.querySelector(
        '.TableCell-Wrapper .TableFilterTooltip-Button',
      );
      fireEvent.click(buttonFilterPrice!);
      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      const targetOption = options[0];
      const select = screen.getByRole('listbox');
      fireEvent.change(select, { target: { value: targetOption.value } });
      const buttonResetAllFilters = screen.getByTitle('Сбросить все фильтры');
      fireEvent.click(buttonResetAllFilters);
      expect(onFiltersUpdated).toBeCalled();
      expect(onFiltersUpdated).toBeCalledTimes(2);
      expect(onFiltersUpdated).toHaveReturnedTimes(2);
    });
  });
});
