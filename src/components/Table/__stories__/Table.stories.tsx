import './Table.stories.css';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import {
  customFilters,
  generateData,
  tableData,
  tableDataWithRenderFn,
  tableWithBagdeData,
  tableWithExpandableRowsData,
  tableWithMergedCellsData,
  tableWithMultiLevelHeadersData,
} from '../__mock__/data.mock';
import { IconCopy } from '../../../icons/IconCopy/IconCopy';
import { updateAt } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Text } from '../../Text/Text';
import { verticalAligns } from '../Cell/TableCell';
import { Filters, SortByProps } from '../filtering';
import {
  headerVerticalAligns,
  Props,
  sizes,
  Table,
  TableColumn,
  TableRow,
  zebraStriped,
} from '../Table';

import mdx from './Table.docs.mdx';

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
  headerVerticalAlign: 'center',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    onFiltersUpdated: (filters) => action('onFiltersUpdated')(filters),
    size: getSizeKnob(),
    borderBetweenColumns: boolean('borderBetweenColumns', props.borderBetweenColumns!),
    borderBetweenRows: boolean('borderBetweenRows', props.borderBetweenRows!),
    isResizable: boolean('isResizable', props.isResizable!),
    zebraStriped: zebraStripedProp === '' ? undefined : zebraStripedProp,
    stickyColumns: number('stickyColumns', props.stickyColumns!),
    stickyHeader: boolean('stickyHeader', props.stickyHeader!),
    emptyRowsPlaceholder: text('emptyRowsPlaceholder', '') || undefined,
    verticalAlign: select('verticalAlign', verticalAligns, props.verticalAlign),
    headerVerticalAlign: select(
      'headerVerticalAlign',
      headerVerticalAligns,
      props.headerVerticalAlign,
    ),
    onRowClick: ({ id, e }) => action(`onRowClick[${id}]`)(e),
  };
};

export const Interactive = createStory(() => <Table {...getKnobs()} />, {
  name: 'обычная',
});

export const CustomRows = createStory(() => <Table {...getKnobs(tableDataWithRenderFn)} />, {
  name: 'рендер ячеек',
});

export const WithCollapcingRows = createStory(
  () => <Table {...getKnobs(tableWithExpandableRowsData)} />,
  {
    name: 'с разворачиванием строк',
  },
);

export const WithMultiLevelHeaders = createStory(
  () => <Table {...getKnobs(tableWithMultiLevelHeadersData)} />,
  {
    name: 'с многоуровневым заголовком',
  },
);

const WithActiveRowContent = (): JSX.Element => {
  const [activeRow, setActiveRow] = React.useState<string>();

  const handleClickRow = ({ id }: { id?: string }): void => {
    setActiveRow(id);
  };

  return <Table {...getKnobs()} activeRow={{ id: activeRow, onChange: handleClickRow }} />;
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
      onRowHover={({ id }): void => setHoveredRow(id)}
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

export const SortByData = createStory(
  () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sortSetting, setSortSetting] = useState<SortByProps<any> | null>(null);
    const data = [
      {
        id: 1,
        date: new Date('Thu Dec 03 2020 14:23:13 GMT+0300 (Moscow Standard Time)'),
      },
      {
        id: 2,
        date: new Date('Thu Dec 03 2020 14:04:13 GMT+0300 (Moscow Standard Time)'),
      },
      {
        id: 3,
        date: new Date('Thu Dec 03 2020 14:55:13 GMT+0300 (Moscow Standard Time)'),
      },
      {
        id: 4,
        date: new Date('Thu Dec 03 2020 14:12:13 GMT+0300 (Moscow Standard Time)'),
      },
    ];

    const rows = data
      .sort((a, b) => {
        if (sortSetting?.sortingBy === 'date') {
          const [firstDate, secondDate] =
            sortSetting.sortOrder === 'asc' ? [a.date, b.date] : [b.date, a.date];
          return firstDate.valueOf() - secondDate.valueOf();
        }
        return 0;
      })
      .map((item) => ({
        id: item.id.valueOf(),
        date: item.date.toString(),
      }));

    const columns = [
      {
        title: `Id`,
        accessor: `id`,
        sortable: true,
      },
      {
        title: `Дата`,
        accessor: `date`,
        sortable: true,
      },
    ];

    return <Table rows={rows} columns={columns} onSortBy={setSortSetting} />;
  },
  {
    name: 'сортировка по времени',
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

export const withCustomFilters = createStory(
  () => {
    return (
      <div className={cnTableStories()}>
        <Table {...getKnobs({ filters: customFilters })} />
      </div>
    );
  },
  {
    name: 'с кастомными фильтрами',
  },
);

export default createMetadata({
  title: 'Компоненты|/Отображение данных/Table',
  id: 'components/Table',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=1871%3A36244',
    },
  },
});
