import './Table.stories.css';

import React from 'react';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import { tableData, tableWithBagdeData } from '../__mock__/data.mock';
import { updateAt } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Text } from '../../Text/Text';
import { verticalAligns } from '../Cell/TableCell';
import { Filters } from '../filtering';
import { Props, sizes, Table, TableRow, zebraStriped } from '../Table';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Table.mdx';

const cnTableStories = cn('TableStories');

const defaultProps = {
  columns: tableData.columns,
  rows: tableData.rows,
  filters: tableData.filters,
  borderBetweenColumns: false,
  borderBetweenRows: false,
  isResizable: false,
  stickyColumns: 0,
  stickyHeader: false,
  verticalAlign: 'top',
  zebraStriped: '',
} as const;

const getSizeKnob = () => select('size', sizes, 'l');
const getFiltersKnob = (filters?: Filters<TableRow>): Filters<TableRow> | undefined => {
  const isFilterable = boolean('filterable', true);

  return isFilterable ? filters : undefined;
};

const getKnobs = (replacedProps?: Partial<Props<TableRow>>): Props<TableRow> => {
  const props = { ...defaultProps, ...replacedProps };

  const zebraStripedProp = select('zebraStriped', ['', ...zebraStriped], props.zebraStriped);

  return {
    columns: object('columns', props.columns),
    rows: object('rows', props.rows),
    filters: getFiltersKnob(props.filters),
    size: getSizeKnob(),
    borderBetweenColumns: boolean('borderBetweenColumns', props.borderBetweenColumns),
    borderBetweenRows: boolean('borderBetweenRows', props.borderBetweenRows),
    isResizable: boolean('isResizable', props.isResizable),
    zebraStriped: zebraStripedProp === '' ? undefined : zebraStripedProp,
    stickyColumns: number('stickyColumns', props.stickyColumns),
    stickyHeader: boolean('stickyHeader', props.stickyHeader),
    emptyRowsPlaceholder: text('emptyRowsPlaceholder', '') || undefined,
    verticalAlign: select('verticalAlign', verticalAligns, props.verticalAlign),
  };
};

export const Interactive = createStory(() => <Table {...getKnobs()} />, {
  name: 'обычная',
});

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

export default createMetadata({
  title: 'Components|/Table',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
