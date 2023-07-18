/* eslint-disable no-unused-vars */
import '../Table.use.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconAdd } from '@consta/icons/IconAdd';
import { IconKebab } from '@consta/icons/IconKebab';
import { IconTrash } from '@consta/icons/IconTrash';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { ContextMenu } from '##/components/ContextMenu';
import {
  Table,
  TableColumn,
  TableProps,
  TableRow,
} from '##/components/Table/Table';
import { putBefore, updateAt } from '##/utils/array';
import { cn } from '##/utils/bem';
import { isNumber } from '##/utils/type-guards';

const cnTableUse = cn('TableUse');

type ContextMenuState = {
  [key: string]: {
    isOpen: boolean;
    ref: React.RefObject<HTMLButtonElement>;
  };
};

type OnRowCreateProps = Parameters<
  Exclude<TableProps<{ id: string }>['onRowCreate'], undefined>
>[0];

type ActionFunctionNames = 'addUp' | 'addDown' | 'addDeep' | 'remove';

enum AVAILABLE_ACTIONS {
  NONE = 0,
  CREATE = 1,
  CREATE_SUB = 2,
  DELETE = 4,
}

type RowType = TableRow & {
  name: string;
  rights: string;
  actions: AVAILABLE_ACTIONS;
  level?: number;
  rows?: RowType[];
};

type ActionItems = {
  type: ActionFunctionNames;
  name: string;
  group: AVAILABLE_ACTIONS;
  icon: IconComponent;
};

const binaryCheck = (base: number, comparator: number) =>
  // eslint-disable-next-line no-bitwise
  (base & comparator) === comparator;
const binarySubtraction = (base: number, subtrahend: number) =>
  // eslint-disable-next-line no-bitwise
  binaryCheck(base, subtrahend) ? base ^ subtrahend : base;

const deepRowAdd = <T extends TableRow>(
  rows: T[],
  id: string,
  level: number,
  newRow: T,
): T[] => {
  if (level === 0) {
    const index = rows.findIndex((val) => val.id === id);
    const newRows = [...rows];
    newRows[index].rows = Array.isArray(newRows[index].rows)
      ? [...newRows[index].rows!, newRow]
      : [newRow];

    return newRows;
  }

  const idPath = id.split('.');
  const curId = idPath.slice(0, idPath.length - level).join('.');

  const index = rows.findIndex((val) => val.id === curId);

  if (index !== -1) {
    return updateAt(rows, index, {
      ...rows[index],
      rows: deepRowAdd(rows[index].rows!, id, level - 1, newRow),
    });
  }

  return rows;
};

const deepRowDelete = <T extends TableRow>(
  rows: T[],
  id: string,
  level: number,
): T[] => {
  if (level === 0) {
    return [...rows].filter((row) => row.id !== id);
  }

  const idPath = id.split('.');
  const curId = idPath.slice(0, idPath.length - level).join('.');

  const index = rows.findIndex((val) => val.id === curId);

  if (index !== -1) {
    const deepRows = [...rows][index].rows;
    const currentRows = [...rows];

    currentRows[index].rows = Array.isArray(deepRows)
      ? deepRowDelete(deepRows!, id, level - 1)
      : [];
    return currentRows;
  }

  return rows;
};

const ALL_ACTIONS =
  // eslint-disable-next-line no-bitwise
  AVAILABLE_ACTIONS.CREATE |
  AVAILABLE_ACTIONS.CREATE_SUB |
  AVAILABLE_ACTIONS.DELETE;

export const TableUseWithRowActions = () => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>(
    {},
  );
  const [counter, setCounter] = useState(5);

  const rowCreateText = 'Create';
  const [rows, setRows] = useState<RowType[]>([
    {
      id: '1',
      name: 'Олег',
      rights: 'developer',
      actions: ALL_ACTIONS,
      rows: [
        {
          id: '1.2',
          name: 'Меня нельзя напрямую удалить',
          rights: 'Front-developer',
          actions: binarySubtraction(
            ALL_ACTIONS,
            // eslint-disable-next-line no-bitwise
            AVAILABLE_ACTIONS.DELETE | AVAILABLE_ACTIONS.CREATE,
          ),
        },
        {
          id: '1.3',
          name: 'У меня нельзя создавать потомков',
          rights: 'Back-developer',
          actions: binarySubtraction(
            ALL_ACTIONS,
            // eslint-disable-next-line no-bitwise
            AVAILABLE_ACTIONS.CREATE | AVAILABLE_ACTIONS.CREATE_SUB,
          ),
        },
      ],
    },
    {
      id: '4',
      name: 'Иван',
      rights: 'admin',
      actions: ALL_ACTIONS,
    },
    {
      id: '5',
      name: 'Александра',
      rights: 'user',
      actions: ALL_ACTIONS,
    },
  ]);

  const getNewRow = (counter: number, previousId?: string) => ({
    id: `${previousId ?? ''}${previousId ? '.' : ''}${counter}`,
    name: `user${counter}`,
    rights: 'user',
    actions: binarySubtraction(
      ALL_ACTIONS,
      previousId ? AVAILABLE_ACTIONS.CREATE : AVAILABLE_ACTIONS.NONE,
    ),
  });

  const actionFunctions: Record<
    ActionFunctionNames,
    (id?: string, level?: number) => void
  > = {
    addUp: (id) =>
      setRows((prevState) => {
        const newCounter = counter + 1;
        setCounter(newCounter);

        const index = prevState.findIndex((row) => row.id === id);
        // Добавляет новый элемент перед указанной позицией
        return putBefore(prevState, index, getNewRow(newCounter));
      }),
    addDown: (id) =>
      setRows((prevState) => {
        const newCounter = counter + 1;
        setCounter(newCounter);

        const index = prevState.findIndex((row) => row.id === id);
        const fixedIndex = index < 0 ? prevState.length : index;
        // Добавляет новый элемент перед следующим, то есть, после указанного
        return putBefore(prevState, fixedIndex + 1, getNewRow(newCounter));
      }),
    addDeep: (id, level) => {
      if (id && isNumber(level)) {
        setRows((prevState) => {
          const newCounter = counter + 1;
          setCounter(newCounter);

          return deepRowAdd(prevState, id, level, getNewRow(newCounter, id));
        });
      }
    },
    remove: (id, level) =>
      setRows((prevState) => deepRowDelete(prevState, id!, level!)),
  };

  const actionItems: ActionItems[] = [
    {
      type: 'addUp',
      name: 'Добавить строку выше',
      group: AVAILABLE_ACTIONS.CREATE,
      icon: IconAdd,
    },
    {
      type: 'addDown',
      name: 'Добавить строку ниже',
      group: AVAILABLE_ACTIONS.CREATE,
      icon: IconAdd,
    },
    {
      type: 'addDeep',
      name: 'Добавить подстроку',
      group: AVAILABLE_ACTIONS.CREATE_SUB,
      icon: IconAdd,
    },
    {
      type: 'remove',
      name: 'Удалить',
      group: AVAILABLE_ACTIONS.DELETE,
      icon: IconTrash,
    },
  ];

  const handleContextMenuClick =
    (onClick: () => void, rowId: string, level?: number) =>
    ({ type }: typeof actionItems[number]) =>
    () => {
      actionFunctions[type](rowId, level);
      onClick();
    };

  const knobs = {
    columns: [
      {
        title: 'ID',
        accessor: 'id',
      },
      {
        title: 'Имя',
        accessor: 'name',
      },
      {
        title: 'Права',
        accessor: 'rights',
      },
      {
        title: 'Действия',
        accessor: 'actions',
        renderCell: (row: typeof rows[number]) => {
          const setMenuState = (isOpen: boolean) => () =>
            setContextMenuState((prevState) => {
              if (prevState[row.id]) {
                return {
                  ...prevState,
                  [row.id]: {
                    ...prevState[row.id],
                    isOpen,
                  },
                };
              }

              return {
                ...prevState,
                [row.id]: {
                  ref: React.createRef<HTMLButtonElement>(),
                  isOpen,
                },
              };
            });

          const menuProps = contextMenuState[row.id];

          if (menuProps === undefined) {
            setMenuState(false)();

            return null;
          }

          const filteredItems = actionItems.filter((action) => {
            if (action.group === AVAILABLE_ACTIONS.CREATE_SUB) {
              return (
                binaryCheck(row.actions, action.group) &&
                isNumber(row.level) &&
                row.level < 2
              );
            }

            return binaryCheck(row.actions, action.group);
          });

          return (
            <>
              <Button
                type="button"
                ref={menuProps.ref}
                size="xs"
                view="clear"
                iconLeft={IconKebab}
                onlyIcon
                onClick={setMenuState(true)}
              />
              {menuProps.isOpen && (
                <ContextMenu
                  anchorRef={menuProps.ref}
                  size="s"
                  offset={4}
                  items={filteredItems}
                  getItemLabel={(item) => item.name}
                  getItemGroupId={(item) => item.group}
                  getItemLeftIcon={(item) => item.icon}
                  getItemOnClick={handleContextMenuClick(
                    setMenuState(false),
                    row.id,
                    row.level,
                  )}
                  direction="downLeft"
                  possibleDirections={['upLeft', 'downLeft']}
                  onClickOutside={setMenuState(false)}
                />
              )}
            </>
          );
        },
      },
    ] as TableColumn<RowType>[],
    rows,
    onRowCreate: ({ id }: OnRowCreateProps) => actionFunctions.addDown(id),
    rowCreateText,
  };

  return (
    <div className={cnTableUse()}>
      <Table {...knobs} borderBetweenColumns borderBetweenRows />
    </div>
  );
};
