import * as React from 'react';
import { render } from '@testing-library/react';

import { SORTED_2_TIMES_ROWS, tableData } from '../../Table/__mock__/data.mock';
import { smartSort, SmartSorting } from '../SmartSorting';

type SmartSortingWindowProps = React.ComponentProps<typeof SmartSorting>;

const options = tableData.columns.map((column) => ({
  optionLabel: column.title as string,
  optionValue: column.accessor as string,
}));

const getComponent = (props: SmartSortingWindowProps) => <SmartSorting {...props} />;

describe('Компонент SmartSorting', () => {
  it('должен рендериться без ошибок', () => {
    render(
      getComponent({
        isOpen: true,
        options,
        value: [],
        onClose: jest.fn(),
        onChange: jest.fn(),
      }),
    );
  });

  it('отрабатывает множественная сортировка', () => {
    const { rows } = tableData;
    const sorters = ['type', '-year'];
    const sortedRows = rows.sort(smartSort(sorters));
    expect(sortedRows).toEqual(SORTED_2_TIMES_ROWS);
  });
});
