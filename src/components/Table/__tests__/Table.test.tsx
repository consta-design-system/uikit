import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Filters } from '../filtering';
import { Props, Table } from '../Table';

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

type Row = typeof rows[number];

const defaultProps: Props<Row> = {
  columns: [
    {
      accessor: 'price',
      title: 'Цена',
    },
    {
      accessor: 'date',
      title: 'Дата',
      renderCell: (row) => <h1>Отображает {row.date.year} год</h1>,
    },
  ],
  rows,
};

const renderComponent = (props: Props<Row> = defaultProps) => {
  return render(<Table {...props} />);
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
  });

  describe('Проверка работы фильтров', () => {
    describe('Компонент с выбором фильтра работает', () => {
      const filters: Filters<Row> = [
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
      ];
      const root = renderComponent({ ...defaultProps, filters });
      const priceCell = screen.getByText('Цена', { selector: '.TableCell-Wrapper' });
      const buttonFilterPrice = priceCell.querySelector(
        '.TableCell-Wrapper .TableFilterTooltip-Button',
      );
      it('Кнопка фильтра существует', () => {
        expect(buttonFilterPrice).not.toBeNull();
      });

      fireEvent.click(buttonFilterPrice!);
      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      const correctFilters = filters.map((f) => f.name);
      const optionsTexNodes = options.map((o) => o.textContent);

      it('Окно с выбором фильтров отобразилось корректно', () => {
        expect(options).toHaveLength(correctFilters.length);
        expect(optionsTexNodes).toEqual(correctFilters);
      });

      const targetOption = options[1];
      it('Целевой option имеет корректное значение', () => {
        expect(targetOption).toHaveValue(filters[1].id);
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
      const priceCell = screen.getByText('Цена', { selector: '.TableCell-Wrapper' });
      const buttonFilterPrice = priceCell.querySelector(
        '.TableCell-Wrapper .TableFilterTooltip-Button',
      );
      fireEvent.click(buttonFilterPrice!);
      const options = screen.getAllByRole('option');
      const correctFilters = filters.filter((f) => f.id && f.field).map((f) => f.name);
      const optionsTexNodes = options.map((o) => o.textContent);
      expect(optionsTexNodes).toEqual(correctFilters);
    });
  });
});
