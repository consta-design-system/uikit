import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Table, TableProps as Props } from '../Table';

const refTestID = 'table-test-ref' as const;

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

    describe('проверка ref', () => {
      it(`добавлен с помощью ref аттрибут "data-testid=${refTestID}"`, () => {
        jest.useFakeTimers();
        renderComponentWithRefAndAddAttr();
        jest.advanceTimersByTime(1000);
        expect(screen.queryByTestId(refTestID)).toBeInTheDocument();
      });
    });
  });
});
