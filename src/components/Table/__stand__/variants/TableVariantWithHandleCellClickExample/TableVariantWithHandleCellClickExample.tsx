import React, { useState } from 'react';

import { ContextMenu } from '##/components/ContextMenu/ContextMenu';
import { onCellClick, Table, TableColumn } from '##/components/Table/Table';
import { Text } from '##/components/Text/Text';

import { useVariants } from '../useVariants/useVariants';

const rows = [
  { id: '1', name: 'Антон' },
  { id: '2', name: 'Василий' },
];

const columns: TableColumn<typeof rows[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    width: 100,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    sortable: true,
  },
];

type Item = {
  name: string;
};

const menuItems: Item[] = [
  {
    name: 'Пункт 1',
  },
  {
    name: 'Пункт 2',
  },
  {
    name: 'Пункт 3',
  },
];

export const TableVariantWithHandleCellClickExample = () => {
  const [ref, setRef] = useState<React.RefObject<HTMLDivElement> | null>(null);
  const [show, setIsShow] = useState<boolean>(false);

  const getLabel = (item: Item) => item.name;

  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();

    if (type === 'click') {
      alert(`Обычный клик, по columnIdx: "${columnIdx}", rowId: "${rowId}"`);
    } else {
      setRef(ref);

      setIsShow(true);
    }
  };

  const props = useVariants({ columns, rows });
  return (
    <div>
      <Text>Клик правой клавишей мыши, для вызова контексного меню</Text>

      <Table {...props} onCellClick={handleCellClick} />

      {show && ref && (
        <ContextMenu
          items={menuItems}
          getItemLabel={getLabel}
          anchorRef={ref}
          direction="downStartLeft"
          onClickOutside={() => setIsShow(false)}
          possibleDirections={['downStartLeft']}
        />
      )}
    </div>
  );
};
