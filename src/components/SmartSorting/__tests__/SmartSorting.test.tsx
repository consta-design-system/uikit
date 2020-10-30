import * as React from 'react';
import { render } from '@testing-library/react';

import { SORTED_2_TIMES_ROWS, tableData } from '../../Table/__mock__/data.mock';
import { smartSort, SmartSortingWindow } from '../SmartSorting';

type SmartSortingWindowProps = React.ComponentProps<typeof SmartSortingWindow>;

const options = tableData.columns.map((column) => ({
  optionLabel: column.title as string,
  optionValue: column.accessor as string,
}));

const getComponent = (props: SmartSortingWindowProps) => <SmartSortingWindow {...props} />;

describe('Компонент SmartSorting', () => {
  it('должен рендериться без ошибок', () => {
    render(
      getComponent({
        isOpen: true,
        options,
        initialValues: [],
        onClose: jest.fn(),
        onUpdate: jest.fn(),
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
