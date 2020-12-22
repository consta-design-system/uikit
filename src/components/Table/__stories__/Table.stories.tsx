import './Table.stories.css';

import React from 'react';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import {
  generateData,
  tableData,
  tableDataWithRenderFn,
  tableWithBagdeData,
  tableWithMergedCellsData,
  tableWithMultiLevelHeadersData,
} from '../__mock__/data.mock';
import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { IconCopy } from '../../../icons/IconCopy/IconCopy';
import { updateAt } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { OrderedOption, smartSort, SmartSorting } from '../../SmartSorting/SmartSorting';
import { Text } from '../../Text/Text';
import { verticalAligns } from '../Cell/TableCell';
import { Filters } from '../filtering';
import { Props, sizes, Table, TableColumn, TableRow, zebraStriped } from '../Table';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Table.mdx';

const cnTableStories = cn('TableStories');

const defaultProps: Props<typeof tableData.rows[number]> = {
  columns: tableData.columns,
  rows: tableData.rows,
  filters: tableData.filters,
  borderBetweenColumns: false,
  borderBetweenRows: false,
  isResizable: false,
  stickyColumns: 0,
  stickyHeader: false,
  verticalAlign: 'top',
  zebraStriped: undefined,
};

const getSizeKnob = () => select('size', sizes, 'l');
const getFiltersKnob = <T extends TableRow>(filters?: Filters<T>): Filters<T> | undefined => {
  const isFilterable = boolean('filterable', true);

  return isFilterable ? filters : undefined;
};

const getKnobs = <T extends TableRow>(replacedProps?: Partial<Props<T>>): Props<T> => {
  const props = { ...defaultProps, ...replacedProps } as Props<T>;

  const zebraStripedProp = select('zebraStriped', ['', ...zebraStriped], props.zebraStriped);

  return {
    columns: object('columns', props.columns),
    rows: object('rows', props.rows),
    filters: getFiltersKnob(props.filters),
    size: getSizeKnob(),
    borderBetweenColumns: boolean('borderBetweenColumns', props.borderBetweenColumns!),
    borderBetweenRows: boolean('borderBetweenRows', props.borderBetweenRows!),
    isResizable: boolean('isResizable', props.isResizable!),
    zebraStriped: zebraStripedProp === '' ? undefined : zebraStripedProp,
    stickyColumns: number('stickyColumns', props.stickyColumns!),
    stickyHeader: boolean('stickyHeader', props.stickyHeader!),
    emptyRowsPlaceholder: text('emptyRowsPlaceholder', '') || undefined,
    verticalAlign: select('verticalAlign', verticalAligns, props.verticalAlign),
  };
};

export const Interactive = createStory(() => <Table {...getKnobs()} />, {
  name: 'обычная',
});

export const CustomRows = createStory(() => <Table {...getKnobs(tableDataWithRenderFn)} />, {
  name: 'рендер ячеек',
});

export const WithMultiLevelHeaders = createStory(
  () => <Table {...getKnobs(tableWithMultiLevelHeadersData)} />,
  {
    name: 'с многоуровневым заголовком',
  },
);

const WithActiveRowContent = (): JSX.Element => {
  const [activeRow, setActiveRow] = React.useState<string>();

  return <Table {...getKnobs()} activeRow={{ id: activeRow, onChange: setActiveRow }} />;
};

export const WithActiveRow = createStory(() => <WithActiveRowContent />, {
  name: 'с выбором строки',
});

export const WithStickyHeader = createStory(
  () => (
    <div className={cnTableStories({ fixedSize: true })}>
      <Table {...getKnobs({ stickyHeader: true })} />
    </div>
  ),
  {
    name: 'с зафиксированным заголовком',
  },
);

export const WithStickyColumn = createStory(
  () => (
    <div className={cnTableStories({ fixedSize: true })}>
      <Table {...getKnobs({ stickyColumns: 1 })} />
    </div>
  ),
  {
    name: 'с зафиксированной колонкой',
  },
);

export const WithBagde = createStory(
  () => {
    return (
      <div className={cnTableStories({ fixedSize: true })}>
        <Table {...getKnobs(tableWithBagdeData)} />
      </div>
    );
  },
  {
    name: 'с Bagde',
  },
);

const WithCheckboxHeaderContent = (): JSX.Element => {
  const ROWS_COUNT = 3;
  const [values, setValues] = React.useState<boolean[]>(new Array(ROWS_COUNT).fill(false));
  const toggleRow = (idx: number): void => {
    setValues(updateAt(values, idx, !values[idx]));
  };

  const rows = values.map((value, idx) => ({
    id: `row${idx}`,
    checkbox: <Checkbox size="m" checked={value} onChange={(): void => toggleRow(idx)} />,
    task: `Задача ${idx}`,
  }));
  const areAllSelected = values.every((v) => v);

  return (
    <div className={cnTableStories({ fixedSize: true })}>
      <Table
        rows={rows}
        size={getSizeKnob()}
        columns={[
          {
            title: (
              <Checkbox
                size="m"
                checked={areAllSelected}
                onChange={(): void => setValues(values.map(() => !areAllSelected))}
              />
            ),
            accessor: 'checkbox',
            width: 60,
          },
          {
            title: 'Задача',
            accessor: 'task',
          },
        ]}
      />
    </div>
  );
};

const WithOnRowHoverContent = <T extends TableRow>(): JSX.Element => {
  const [hoveredRow, setHoveredRow] = React.useState<string | undefined>(undefined);
  const rows = tableData.rows.map((row) => ({
    ...row,
    button: (
      <Button
        view="ghost"
        size="xs"
        iconLeft={IconCopy}
        onlyIcon
        style={{ visibility: hoveredRow === row.id ? 'initial' : 'hidden' }}
      />
    ),
  }));

  const columns: Array<TableColumn<typeof rows[number]>> = [
    {
      title: 'Появится кнопка при наведении',
      accessor: 'button',
      align: 'center',
      width: 120,
    },
    ...tableData.columns,
  ];

  return (
    <Table
      {...getKnobs<typeof rows[number]>()}
      columns={columns}
      rows={rows}
      onRowHover={({ id }) => setHoveredRow(id)}
    />
  );
};

export const WithCheckboxHeader = createStory(() => <WithCheckboxHeaderContent />, {
  name: 'с Checkbox в шапке',
});

export const WithCustomRowsPlaceholder = createStory(
  () => (
    <Table
      columns={tableData.columns}
      rows={[]}
      emptyRowsPlaceholder={<Text>Данные не найдены</Text>}
    />
  ),
  {
    name: 'со своим текстом если данных нет',
  },
);

export const WithBigData = createStory(
  () => {
    const { rows, columns } = generateData(5000, 5);
    return (
      <Table
        {...getKnobs({ rows, columns })}
        lazyLoad={{ maxVisibleRows: 210, scrollableEl: window }}
      />
    );
  },
  {
    name: 'с большим количеством строк',
  },
);

export const WithOnRowHover = createStory(() => <WithOnRowHoverContent />, {
  name: 'с наведением на строку',
});

export const WithMergedCells = createStory(
  () => (
    <Table
      {...getKnobs({
        ...(tableWithMergedCellsData as Partial<Props<TableRow>>),
        borderBetweenColumns: true,
        borderBetweenRows: true,
      })}
    />
  ),
  {
    name: 'с объединёнными ячейками',
  },
);

export const WithSmartSorting = createStory(
  () => {
    const [isSmartSortingWindowOpen, setIsSmartSortingWindowOpen] = React.useState(false);
    const [orderedOptions, setOrderedOptions] = React.useState<Array<OrderedOption>>([]);

    const options = tableData.columns.map((column) => ({
      optionLabel: column.title as string,
      optionValue: column.accessor as string,
    }));

    const sorters = orderedOptions.map((option) =>
      option.orderValue === 'asc' ? option.optionValue : `-${option.optionValue}`,
    );

    const columns =
      orderedOptions.length > 0
        ? tableData.columns.map((column) => {
            const col = { ...column };
            if (column.accessor) {
              col.sortable = false;
            }
            return col;
          })
        : tableData.columns;

    const rows = [...tableData.rows].sort(smartSort(sorters));

    return (
      <div className={cnTableStories({ flexColumn: true })}>
        <Button
          size="m"
          view="ghost"
          label="Умная сортировка"
          width="default"
          iconLeft={orderedOptions.length ? IconCheck : undefined}
          className={cnTableStories('ButtonSorting', { withBadge: orderedOptions.length > 0 })}
          onClick={() => setIsSmartSortingWindowOpen(true)}
        />
        {orderedOptions.length > 0 && (
          <Badge size="s" label={`${orderedOptions.length}`} status="system" form="round" />
        )}
        <SmartSorting
          isOpen={isSmartSortingWindowOpen}
          options={options}
          value={orderedOptions}
          onChange={setOrderedOptions}
          onClose={() => setIsSmartSortingWindowOpen(false)}
          className={cnTableStories('MySmartSortingWindow')}
        />
        <Table rows={rows} columns={columns} />
      </div>
    );
  },
  {
    name: 'с умной сортировкой',
  },
);

export default createMetadata({
  title: 'Компоненты|/Table',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
