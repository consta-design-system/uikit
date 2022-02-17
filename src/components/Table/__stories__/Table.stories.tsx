import './Table.stories.css';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import {
  customFilters,
  CustomIDs,
  generateData,
  partOfTableDataForCustomTagLabelFunction,
  rowsForCustomTagLabelFunction,
  tableData,
  tableDataWithAdditionalClassName,
  tableDataWithRenderFn,
  tableWithBagdeData,
  tableWithExpandableRowsData,
  tableWithMergedCellsData,
  tableWithMultiLevelHeadersData,
  withControlTableMock,
  withHiddenColumnTableMock,
} from '../__mock__/data.mock';
import { IconCopy } from '../../../icons/IconCopy/IconCopy';
import { updateAt } from '../../../utils/array';
import { callbackWithSelector, createMetadata, createStory } from '../../../utils/storybook';
import { isNotNil } from '../../../utils/type-guards';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Text } from '../../Text/Text';
import { verticalAligns } from '../Cell/TableCell';
import { Filters, SortByProps } from '../filtering';
import {
  headerVerticalAligns,
  sizes,
  Table,
  TableColumn,
  TableProps as Props,
  TableProps,
  TableRow,
  zebraStriped,
} from '../Table';

import WithAdditionalClassName from './examples/WithAdditionalClassName/WithAdditionalClassName';
import WithHandleCellClick from './examples/WithHandleCellClick';
import WithRowCreationAndDeletion from './examples/WithRowCreationAndDeletion';
import { cnTableStories } from './helpers';
import mdx from './Table.docs.mdx';

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
  getAdditionalClassName: undefined,
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

  const handleRowClick = callbackWithSelector({ name: 'onRowClick', isActive: false });
  const handleRowHover = callbackWithSelector({ name: 'onRowHover', isActive: false });
  const handleAdditionalClass = callbackWithSelector(
    { name: 'getAdditionalClassName', isActive: true },
    props.getAdditionalClassName,
  ) as ((props: { column: TableColumn<T>; row: T; isActive: boolean }) => string) | undefined;

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
    onRowClick: handleRowClick,
    onRowHover: handleRowHover,
    onRowCreate: undefined,
    rowCreateText: undefined,
    getTagLabel: props.getTagLabel,
    getAdditionalClassName: handleAdditionalClass,
  };
};

export const Interactive = createStory(() => <Table {...getKnobs()} />, {
  name: 'обычная',
});

export const CustomRows = createStory(
  () => {
    const { columns, ...props } = getKnobs(tableDataWithRenderFn);

    const copyColumns = [...columns].map((column) => {
      const copy = { ...column };
      if (copy.accessor === 'year') {
        copy.renderCell = (row: typeof props.rows[number]): React.ReactNode => {
          return <h2>{row.year.value}</h2>;
        };
      }
      return copy;
    });

    return <Table columns={copyColumns} {...props} />;
  },
  {
    name: 'рендер ячеек',
  },
);

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

export const WithGetAdditionalClassName = createStory(
  () => {
    return <WithAdditionalClassName {...getKnobs(tableDataWithAdditionalClassName)} />;
  },
  {
    name: 'с дополнительным классом',
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

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: 'Появится кнопка при наведении',
      accessor: 'button',
      align: 'center',
      width: 120,
    },
    ...(tableData.columns as TableColumn<typeof rows[number]>[]),
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
  name: 'с чекбоксом в шапке',
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
    name: 'со своим текстом, если данных нет',
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

export const WithMergedByCustomCallbackCells = createStory(
  () => {
    const ADMIN_INDEXES = [3, 4, 7];
    const USERS_COUNT = 12;

    const checkedRow: { [key: string]: boolean } = new Array(USERS_COUNT)
      .fill(false)
      .reduce((previous, _, index) => {
        return {
          ...previous,
          [`${index + 1}`]: !Math.round(Math.random()),
        };
      }, {});

    const generateRowBase = (id: string, owner: string, viewed: boolean) => ({
      id,
      owner,
      operationConfirmed: {
        owner,
        viewed,
      },
    });

    return (
      <Table
        borderBetweenColumns
        borderBetweenRows
        columns={[
          {
            title: 'ID',
            accessor: 'id',
            align: 'left',
          },
          {
            title: 'Инициатор операции',
            accessor: 'owner',
            mergeCells: true,
          },
          {
            title: 'Операция подтверждена',
            accessor: 'operationConfirmed',
            mergeCells: true,
            getComparisonValue: ({ owner, viewed }) => `${owner}-${viewed}`,
            renderCell: ({ operationConfirmed: { viewed } }) => <Checkbox checked={viewed} />,
          },
        ]}
        rows={Object.keys(checkedRow).map((id, index) => {
          const isAuto = ADMIN_INDEXES.includes(index);
          return {
            ...generateRowBase(id, `${isAuto ? 'admin' : 'user'}`, isAuto ? true : checkedRow[id]),
          };
        })}
      />
    );
  },
  {
    name: 'с ячейками, объединёнными кастомной функцией',
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

export const withCustomTagLabelFunction = createStory(
  () => {
    type GetTagLabel = (filterValue: any) => string;

    const tagLabelById: Record<CustomIDs, GetTagLabel> = {
      [CustomIDs.fullName]: (filterValue: Array<{ value: string; name: string }>) => {
        if (!Array.isArray(filterValue)) {
          return '';
        }

        return filterValue.reduce((fullText, { value }) => {
          // Выводим только первые буквы в отдельных словах, таким образом получим инициалы
          return `${fullText}${fullText.length ? ', ' : ''}${value
            .split(' ')
            .map((str) => str.slice(0, 1))
            .join('')}`;
        }, '');
      },
      [CustomIDs.yearOfRegistration]: (filterValue) => {
        let restName = '';
        if (filterValue.min && filterValue.max) {
          restName = `начиная с ${filterValue.min} и заканчивая ${filterValue.max}`;
        } else if (filterValue.min) {
          restName = `начиная с ${filterValue.min}`;
        } else if (filterValue.max) {
          restName = `заканчивая ${filterValue.max}`;
        }

        return restName;
      },
    };

    return (
      <div className={cnTableStories()}>
        <Table
          {...getKnobs(partOfTableDataForCustomTagLabelFunction)}
          getTagLabel={(id, name, filterValue: any) => {
            if (!isNotNil(filterValue)) {
              return name;
            }

            const getTagLabel = tagLabelById[id as CustomIDs];

            return name + getTagLabel(filterValue);
          }}
        />
      </div>
    );
  },
  {
    name: 'со своей функцией переименования тега в фильтре',
  },
);

export const WithRowActions = createStory(() => <WithRowCreationAndDeletion />, {
  name: 'с добавлением/удалением строк',
});

export const WithIcon = createStory(() => <Table {...getKnobs(withControlTableMock)} />, {
  name: 'с дополнительным элементом в заголовке',
});

export const WithHandleCellClickExample = createStory(() => <WithHandleCellClick />, {
  name: 'с обработкой клика по ячейке',
});

export const WithHiddenColumn = createStory(
  () => {
    const [mock, setMock] = useState<TableProps<typeof rowsForCustomTagLabelFunction[number]>>(
      withHiddenColumnTableMock,
    );
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const handleClick = () => {
      setIsHidden(!isHidden);

      const overrideMock = { ...mock };

      overrideMock.columns = overrideMock.columns.map((column) => {
        const newColumn = { ...column };

        if (newColumn.hidden !== undefined) {
          newColumn.hidden = !column.hidden;
        }

        return newColumn;
      });

      setMock(overrideMock);
    };

    return (
      <div>
        <Button label={isHidden ? 'Показать колонку' : 'Скрыть колонку'} onClick={handleClick} />
        <Table {...getKnobs(mock)} columns={mock.columns} />
      </div>
    );
  },
  {
    name: 'со скрытыми колонками',
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
