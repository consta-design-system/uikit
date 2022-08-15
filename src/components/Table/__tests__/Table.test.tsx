import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { sortBy } from '../../../utils/array';
import { generateData } from '../__mock__/data.mock';
import { Filters } from '../filtering';
import { cnTableRowsCollapse } from '../RowsCollapse/TableRowsCollapse';
import {
  Table,
  TableChoiceGroupFilter,
  TableColumn,
  TableNumberFilter,
  TableProps as Props,
  TableTextFilter,
} from '../Table';

const testId = 'table-test-id' as const;

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

function getRender() {
  return screen.getByTestId(testId);
}

function getGridTemplateColumn() {
  // https://github.com/testing-library/jest-dom/issues/322#issuecomment-988212751 - открыто
  return Object.values(getRender())[1].style[
    '--table-grid-template-columns'
  ].split(' ')[0];
}

function getRows() {
  return screen.getAllByRole('presentation');
}

function getFilterButtons() {
  return getRender().querySelectorAll(
    `.TableHeader-Buttons .TableFilterTooltip-Button`,
  );
}

function getSortButtons() {
  return getRender().querySelectorAll(`.TableHeader-Buttons .TableHeader-Icon`);
}

const renderComponent = (props: Props<Row> = defaultProps) => {
  return render(<Table {...props} data-testid={testId} />);
};

function getRowsCollapse() {
  return getRows()[0].querySelector(`.${cnTableRowsCollapse()}`);
}

function getCollapseButton() {
  return getRowsCollapse()?.querySelector(
    `.${cnTableRowsCollapse('buttonContainer')} .Button`,
  );
}

const movementDescriptor =
  Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'movementX') || {};

beforeAll(() => {
  Object.defineProperty(MouseEvent.prototype, 'movementX', {
    configurable: true,
    enumerable: true,
    get: () => 0,
  });
});

afterAll(() => {
  Object.defineProperty(MouseEvent.prototype, 'movementX', movementDescriptor);
});

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
    describe('проверка работы TableRowsCollapse', () => {
      const rows = [
        {
          id: 'row1',
          name: 'name1',
          count: 100,
          rows: [
            {
              id: 'row1.1',
              name: 'name1.1',
              count: 300,
            },
            {
              id: 'row1.2',
              name: 'name1.2',
              count: 400,
            },
          ],
        },
        {
          id: 'row2',
          name: 'name2',
          count: 200,
        },
      ];
      const columns: TableColumn<typeof rows[number]>[] = [
        {
          accessor: 'name',
          title: 'Название',
        },
        {
          accessor: 'count',
          title: 'Количество',
        },
      ];
      it('проверка разворачивания и сворачивания строк Table-CellsRow', () => {
        render(<Table {...{ columns, rows }} data-testid={testId} />);
        expect(getRows().length).toEqual(rows.length);
        expect(screen.getByText('name1')).toBeInTheDocument();

        const button = getCollapseButton() as Element;
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        const rowsCollapseLength = 2;
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(getRows().length).toEqual(rows.length + rowsCollapseLength);
        expect(screen.getByText('name1.2')).toBeInTheDocument();

        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(getRows().length).toEqual(rows.length);
        expect(screen.queryByText('name1.2')).not.toBeInTheDocument();
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
      it('добавление аттрибута с помощью ref', () => {
        const refAttrName = 'data-test-ref';
        const refAttrValue = 'test-ref';
        const ref = { current: null } as React.RefObject<HTMLDivElement>;
        render(<Table {...defaultProps} ref={ref} data-testid={testId} />);
        if (ref.current) {
          ref.current.setAttribute(refAttrName, refAttrValue);
        }
        expect(getRender()).toHaveAttribute(refAttrName, refAttrValue);
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

    it('Проверка обработчика activeRow', () => {
      const handleClickRow = jest.fn(({ id }: { id?: string }) => id);
      const activeRowId = rows[0].id;
      renderComponent({
        ...defaultProps,
        activeRow: { id: activeRowId, onChange: handleClickRow },
      });
      const row = getRows()[1];
      fireEvent.click(row.children[0]);
      expect(handleClickRow.mock.results[0].value).toEqual(rows[1].id);
    });

    it('Проверка обработчика onRowHover', () => {
      const hoverIdx = 1;
      const onRowHover = jest.fn(
        ({ id, e }: { id: string | undefined; e: React.MouseEvent }) => [id, e],
      );
      renderComponent({ ...defaultProps, onRowHover });
      const nodeRow = getRows()[hoverIdx];
      fireEvent.mouseOver(nodeRow);
      expect(onRowHover.mock.calls[0][0].id).toEqual(rows[hoverIdx].id);
    });
  });

  describe('Добавление строки', () => {
    it('Рендер кнопки под таблицей и проверка обработки события onRowCreate', () => {
      const onRowCreate = jest.fn();
      renderComponent({ ...defaultProps, onRowCreate });
      fireEvent.click(screen.getByRole('button', { name: /добавить строку/i }));
      expect(onRowCreate.mock.calls[0][0].id).toEqual(rows[rows.length - 1].id);
    });
  });

  describe('Проверка сортировки', () => {
    const rows = [
      {
        id: '1',
        num: 2,
      },
      {
        id: '2',
        num: 3,
      },
      {
        id: '3',
        num: 1,
      },
    ];

    const ascRows = sortBy(rows, 'num', 'asc');
    const descRows = sortBy(rows, 'num', 'desc');

    describe('Проверка типа сортировки по умолчанию: column.order', () => {
      it('Сортировка по умолчанию: без передачи параметра order, не сортируется', () => {
        const columns: TableColumn<typeof rows[number]>[] = [
          {
            title: '#',
            accessor: 'id',
          },
          {
            title: 'num',
            accessor: 'num',
          },
        ];

        render(<Table {...{ columns, rows }} data-testid={testId} />);
        getRows().forEach((el, i) => {
          expect(el.children[1].textContent).toBe(rows[i].num.toString());
        });
      });

      it('Сортировка по умолчанию: по возрастанию', () => {
        const columns: TableColumn<typeof rows[number]>[] = [
          {
            title: '#',
            accessor: 'id',
          },
          {
            title: 'num',
            accessor: 'num',
            order: 'asc',
          },
        ];

        render(<Table {...{ columns, rows }} data-testid={testId} />);
        getRows().forEach((el, i) => {
          expect(el.children[1].textContent).toBe(ascRows[i].num.toString());
        });
      });

      it('Сортировка по умолчанию: по убыванию', () => {
        const columns: TableColumn<typeof rows[number]>[] = [
          {
            title: '#',
            accessor: 'id',
          },
          {
            title: 'num',
            accessor: 'num',
            order: 'desc',
          },
        ];

        render(<Table {...{ columns, rows }} data-testid={testId} />);
        getRows().forEach((el, i) => {
          expect(el.children[1].textContent).toBe(descRows[i].num.toString());
        });
      });
    });

    it('Проверка кнопки сортировки в хедере колонки', () => {
      const columns: TableColumn<typeof rows[number]>[] = [
        {
          title: '#',
          accessor: 'id',
        },
        {
          title: 'num',
          accessor: 'num',
          sortable: true,
        },
      ];

      render(<Table {...{ columns, rows }} data-testid={testId} />);
      const button = getSortButtons()[0];
      fireEvent.click(button);
      getRows().forEach((el, i) => {
        expect(el.children[1].textContent).toBe(ascRows[i].num.toString());
      });
      fireEvent.click(button);
      getRows().forEach((el, i) => {
        expect(el.children[1].textContent).toBe(descRows[i].num.toString());
      });

      fireEvent.click(button);
      getRows().forEach((el, i) => {
        expect(el.children[1].textContent).toBe(rows[i].num.toString());
      });
    });

    it('Проверка вызова метода column.sortFn', () => {
      const sortFn = jest.fn((a, b) => (a < b ? -1 : 1));
      const columns: TableColumn<typeof rows[number]>[] = [
        {
          title: '#',
          accessor: 'id',
        },
        {
          title: 'num',
          accessor: 'num',
          sortable: true,
          sortFn,
        },
      ];

      render(<Table {...{ columns, rows }} data-testid={testId} />);
      const button = getSortButtons()[0];
      fireEvent.click(button);
      expect(sortFn).toHaveBeenCalled();
      getRows().forEach((el, i) => {
        expect(el.children[1].textContent).toBe(ascRows[i].num.toString());
      });
    });
  });

  describe('Проверка отсутствие строк', () => {
    it('Информация по умолчанию', () => {
      render(<Table {...defaultProps} rows={[]} data-testid={testId} />);
      expect(screen.getByText('Нет данных')).toBeInTheDocument();
    });

    it('Переопределенная заглушка', () => {
      render(
        <Table
          {...defaultProps}
          rows={[]}
          emptyRowsPlaceholder="Пусто"
          data-testid={testId}
        />,
      );
      expect(screen.getByText('Пусто')).toBeInTheDocument();
    });
  });

  describe('Проверка фильтрации', () => {
    describe('Фильтр по умолчанию', () => {
      const filterColumn = {
        accessor: 'price',
        title: 'Цена',
      };

      it('Проверка функциональности фильтра по умолчанию', () => {
        renderComponent({ ...defaultProps });
        const buttonFilterPrice = getFilterButtons()[0];
        fireEvent.click(buttonFilterPrice);
        const options = screen.getAllByRole('option') as HTMLOptionElement[];
        const correctFilters = defaultFilters
          .filter((f) => f.field === filterColumn.accessor)
          .map((f) => f.name);
        const optionsTexNodes = options.map((o) => o.textContent);
        expect(options).toHaveLength(correctFilters.length);
        expect(optionsTexNodes).toEqual(correctFilters);

        const targetOption = options[1];
        expect(targetOption).toHaveValue(defaultFilters[1].id);
        const select = screen.getByRole('listbox');
        fireEvent.change(select, { target: { value: targetOption.value } });
        expect(getRows()).toHaveLength(1);
        expect(screen.getByText('300')).toBeInTheDocument();
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
        const buttonFilterPrice = getFilterButtons()[0];
        fireEvent.click(buttonFilterPrice);
        const options = screen.getAllByRole('option');
        const correctFilters = filters
          .filter((f) => f.id && f.field)
          .map((f) => f.name);
        const optionsTexNodes = options.map((o) => o.textContent);
        expect(optionsTexNodes).toEqual(correctFilters);
      });

      it('Сбросить один фильтр', () => {
        const { container } = renderComponent({ ...defaultProps });
        fireEvent.click(getFilterButtons()[0]);
        fireEvent.change(screen.getByRole('listbox'), {
          target: {
            value: (screen.getAllByRole('option') as HTMLOptionElement[])[1]
              .value,
          },
        });
        expect(getRows()).toHaveLength(1);
        fireEvent.click(container.querySelectorAll('.TagBase-CancelButton')[0]);
        expect(getRows()).toHaveLength(3);
      });

      it('проверка вывода span в TableSelectedOptionsList', () => {
        renderComponent({ ...defaultProps });
        fireEvent.click(getFilterButtons()[0]);
        fireEvent.change(screen.getByRole('listbox'), {
          target: {
            value: (screen.getAllByRole('option') as HTMLOptionElement[])[2]
              .value,
          },
        });
        const selectedTitle = (
          screen.getAllByRole('option') as HTMLOptionElement[]
        )[2].title;
        expect(screen.getByText('150')).toBeInTheDocument();
        expect(screen.getAllByText(selectedTitle)).toHaveLength(2);
        const buttonResetAllFilters = screen.getByTitle('Сбросить все фильтры');
        fireEvent.click(buttonResetAllFilters);
        expect(screen.getAllByText(selectedTitle)).toHaveLength(1);
      });

      it('Кнопка "Сбросить все фильтры" работает (вызывает onFiltersUpdate)', () => {
        const onFiltersUpdated = jest.fn(() => true);
        renderComponent({ ...defaultProps, onFiltersUpdated });
        const buttonFilterPrice = getFilterButtons()[0];
        fireEvent.click(buttonFilterPrice);
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

    describe('Проверка кастомных фильтров', () => {
      const rows = [
        {
          id: '1',
          name: 'Peter',
          age: 35,
          country: 'Russia',
        },
        {
          id: '2',
          name: 'Alex',
          age: 25,
          country: 'Germany',
        },
        {
          id: '3',
          name: 'Mike',
          age: 18,
          country: 'France',
        },
      ];

      const props: Props<typeof rows[number]> = {
        columns: [
          {
            accessor: 'name',
            title: 'Имя',
          },
          {
            accessor: 'age',
            title: 'Возраст',
          },
          {
            accessor: 'country',
            title: 'Страна',
          },
        ],
        filters: [
          {
            id: 'filterName',
            name: 'Фильтр по имени: ',
            field: 'name',
            filterer: (
              cellValue,
              filterValues: Array<{ value: string; name: string }>,
            ) => {
              return filterValues.some(
                (filterValue) => filterValue.value === cellValue,
              );
            },
            component: {
              name: TableTextFilter,
              props: {
                title: 'Название',
                withSearch: true,
                items: [
                  { name: 'Peter', value: 'Peter' },
                  { name: 'Alex', value: 'Alex' },
                  { name: 'Mike', value: 'Mike' },
                ],
              },
            },
          },
          {
            id: 'filterAge',
            name: 'Диапазон возраста: ',
            field: 'age',
            filterer: (
              cellValue,
              filterValues: { min: string; max: string },
            ) => {
              const min = Number(filterValues.min) || -Infinity;
              const max = Number(filterValues.max) || Infinity;
              return cellValue >= min && cellValue <= max;
            },
            component: {
              name: TableNumberFilter,
            },
          },
          {
            id: 'filterCountry',
            name: 'Страна проживания: ',
            field: 'country',
            filterer(
              cellValue,
              filterValue: { name: string; value: number },
            ): boolean {
              if (filterValue.name === 'Все') return true;
              return cellValue === filterValue.value;
            },
            component: {
              name: TableChoiceGroupFilter,
              props: {
                items: [
                  { name: 'Russia', value: 'Russia' },
                  { name: 'Germany', value: 'Germany' },
                  { name: 'France', value: 'France' },
                ],
              },
            },
          },
        ],
        rows,
      };

      describe('Проверка TableFilterContainer', () => {
        it('Проверка наличия title', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[0]);
          expect(screen.getByText(/название/i)).toBeInTheDocument();
        });
      });

      describe('Проверка TableTextFilter', () => {
        it('Функционал фильтрации', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[0]);
          fireEvent.click(screen.getByRole('button', { name: /сбросить/i }));
          fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Alex' },
          });
          fireEvent.click(screen.getByRole('checkbox'));
          fireEvent.click(screen.getByRole('button', { name: /применить/i }));
          expect(getRows()).toHaveLength(1);
          expect(getRows()[0].children[0].textContent).toBe('Alex');

          fireEvent.click(getFilterButtons()[0]);
          fireEvent.click(screen.getByRole('button', { name: /выбрать все/i }));
          fireEvent.click(screen.getByRole('button', { name: /применить/i }));
          expect(getRows()).toHaveLength(3);
        });

        it('Отсутствие данных при поиске', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[0]);
          fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Anna' },
          });
          expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
        });

        it('Закрытие окна фильтров без применения', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[0]);
          fireEvent.click(screen.getByRole('button', { name: /отмена/i }));
          expect(getRows()).toHaveLength(3);

          fireEvent.click(getFilterButtons()[0]);
          fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'Alex' },
          });
          fireEvent.click(screen.getByRole('checkbox'));
          fireEvent.click(screen.getByRole('button', { name: /отмена/i }));
          expect(getRows()).toHaveLength(3);
        });
      });

      describe('Проверка TableNumberFilter', () => {
        it('Функционал фильтрации', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[1]);
          fireEvent.change(screen.getAllByRole('textbox')[0], {
            target: { value: 20 },
          });
          fireEvent.change(screen.getAllByRole('textbox')[1], {
            target: { value: 30 },
          });
          fireEvent.click(screen.getByRole('button', { name: /применить/i }));
          expect(getRows()).toHaveLength(1);
          expect(screen.getByText(/^alex$/i)).toBeInTheDocument();
        });
      });

      describe('Проверка TableChoiceGroupFilter', () => {
        it('Функционал фильтрации', () => {
          render(<Table {...props} data-testid={testId} />);
          fireEvent.click(getFilterButtons()[2]);
          fireEvent.click(screen.getByRole('radio', { name: /france/i }));
          fireEvent.click(screen.getByRole('button', { name: /применить/i }));
          expect(getRows()).toHaveLength(1);
          expect(screen.getByText(/^mike$/i)).toBeInTheDocument();
          fireEvent.click(getFilterButtons()[2]);
          fireEvent.click(screen.getByRole('radio', { name: /все/i }));
          fireEvent.click(screen.getByRole('button', { name: /применить/i }));
          expect(getRows()).toHaveLength(3);
        });
      });
    });
  });

  describe('Проверка изменение ширины колонки', () => {
    it('должен рендериться TableResizer без ошибок', () => {
      renderComponent({ ...defaultProps, isResizable: true });
    });

    it('Проверка css и style при перетаскивании ползунка', () => {
      const mockMovementX = jest.spyOn(
        MouseEvent.prototype,
        'movementX',
        'get',
      );
      const { container } = renderComponent({
        ...defaultProps,
        isResizable: true,
      });
      const resBtns = container.querySelectorAll('.TableResizer');

      fireEvent.dblClick(resBtns[0]);
      expect(getGridTemplateColumn()).toBe('0px');

      mockMovementX.mockImplementation(() => 10);
      fireEvent.mouseDown(resBtns[0]);
      fireEvent.mouseMove(resBtns[0]);
      expect(getGridTemplateColumn()).toBe('10px');

      fireEvent.mouseMove(resBtns[0]);
      expect(getGridTemplateColumn()).toBe('20px');
      expect(resBtns[0]).toHaveClass('TableResizer_isDragging');
      expect(resBtns[0]).toHaveClass('TableResizer_isVisible');
      mockMovementX.mockImplementation(() => -100);

      fireEvent.mouseMove(resBtns[0]);
      expect(getGridTemplateColumn()).toBe('0px');

      fireEvent.mouseUp(resBtns[0]);
      expect(resBtns[0]).not.toHaveClass('TableResizer_isDragging');
      expect(resBtns[0]).not.toHaveClass('TableResizer_isVisible');
      mockMovementX.mockReset();
    });
  });

  describe('Ленивая загрузка', () => {
    it('Проверка функциональности', () => {
      const mockOffsetHeight = jest.spyOn(
        HTMLElement.prototype,
        'getBoundingClientRect',
      );
      const maxVisibleRows = 20;

      const { rows, columns } = generateData(maxVisibleRows, 2);
      render(
        <Table
          rows={rows}
          columns={columns}
          data-testid={testId}
          lazyLoad={{ maxVisibleRows: 20 }}
        />,
      );
      expect(getRows()[0].firstChild?.textContent).toEqual(rows[0].column1);
      const table = getRender();
      const defaultMetrics = table.getBoundingClientRect();
      mockOffsetHeight.mockImplementation(() => ({
        ...defaultMetrics,
        top: -200,
      }));
      fireEvent.scroll(table);
      expect(getRows()[0].firstChild?.textContent).toEqual(
        rows[Math.floor(maxVisibleRows / 3)].column1,
      );
      mockOffsetHeight.mockImplementation(() => ({
        ...defaultMetrics,
        top: 200,
      }));
      fireEvent.scroll(table);
      expect(getRows()[0].firstChild?.textContent).toEqual(rows[0].column1);
      mockOffsetHeight.mockReset();
    });
  });
});
