import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import {
  COLUMNS,
  generateData,
  TRANSFORMED_COLUMNS,
} from '../__mock__/data.mock';
import {
  getColumnLeftOffset,
  getColumnsSize,
  getMaxLevel,
  getNewSorting,
  transformColumns,
  useLazyLoadData,
} from '../helpers';
import { TableColumn, TableRow } from '../Table';

describe('getColumnsSize', () => {
  it('получение размера колонок', () => {
    const result = getColumnsSize([150, undefined]);

    expect(result).toEqual('150px auto');
  });
});

describe('getColumnLeftOffset', () => {
  it('получение отступа слева от колонки, если размеры колонок отсутствуют', () => {
    const result = getColumnLeftOffset({
      columnIndex: 0,
      resizedColumnWidths: [],
      initialColumnWidths: [],
    });

    expect(result).toEqual(0);
  });

  it('получение отступа слева от колонки, если у колонки не изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 1,
      resizedColumnWidths: [],
      initialColumnWidths: [100],
    });

    expect(result).toEqual(100);
  });

  it('получение отступа слева от колонки, если у колонки изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 1,
      resizedColumnWidths: [200],
      initialColumnWidths: [100],
    });

    expect(result).toEqual(200);
  });

  it('получение отступа слева от колонки, если не у всех колонок до выбранной изменялся размер', () => {
    const result = getColumnLeftOffset({
      columnIndex: 3,
      resizedColumnWidths: [200, undefined, 300],
      initialColumnWidths: [100, 100, 100],
    });

    expect(result).toEqual(600);
  });
});

type TestRow = {
  id: string;
  field: string;
  anotherField: string;
};

describe('getNewSorting', () => {
  it('устанавливает сортировку по полю, если не было сортировки', () => {
    expect(getNewSorting<TestRow>(null, 'field')).toEqual({
      by: 'field',
      order: 'asc',
    });
  });

  it('устанавливает сортировку по полю, если было отсортировано по другому полю', () => {
    const result = getNewSorting<TestRow>(
      { by: 'anotherField', order: 'asc' },
      'field',
    );

    expect(result).toEqual({
      by: 'field',
      order: 'asc',
    });
  });

  it('устанавливает сортировку по убыванию, если было отсортировано по возрастанию', () => {
    const result = getNewSorting<TestRow>(
      { by: 'field', order: 'asc' },
      'field',
    );

    expect(result).toEqual({
      by: 'field',
      order: 'desc',
    });
  });

  it('убирает сортировку, если было отсортировано по убыванию', () => {
    const result = getNewSorting<TestRow>(
      { by: 'field', order: 'desc' },
      'field',
    );

    expect(result).toEqual(null);
  });
});

describe('transformColumns', () => {
  it('преобразует исходный массив с любым уровнем вложенности в массив массивов 2 уровня', () => {
    const result = transformColumns(
      COLUMNS as Array<TableColumn<TableRow>>,
      getMaxLevel(COLUMNS as Array<TableColumn<TableRow>>),
    );

    expect(result).toEqual(TRANSFORMED_COLUMNS);
  });
});

describe('useLazyLoadData', () => {
  const data = generateData(500, 5);
  const { result } = renderHook(() => useLazyLoadData(210, window, true));

  it('отрезает часть массива видимых строк от исходного массива', () => {
    let slicedRows: TableRow[] = [];

    act(() => {
      slicedRows = result.current.getSlicedRows(data.rows);
    });

    expect(slicedRows).toEqual(data.rows.slice(0, 210));
  });

  it('проставляет рефы необходимым ячейкам', () => {
    let cellRef: React.RefObject<HTMLDivElement> | undefined | null = null;

    act(() => {
      cellRef = result.current.setBoundaryRef(0, 140);
    });

    expect(cellRef).not.toEqual(null);
  });
});
