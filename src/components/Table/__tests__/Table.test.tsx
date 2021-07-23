import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Props, Table } from '../Table';

const rows = [
  {
    id: 'row1',
    count: 150,
    price: 50,
    date: {
      year: 2020,
    },
  },
  {
    id: 'row2',
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
});
