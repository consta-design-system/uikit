import './ModalExampleTable.css';

import { Example } from '@consta/stand';
import { Table, TableColumn } from '@consta/table/Table';
import React, { useRef } from 'react';

import { cn } from '##/utils/bem';

import { Modal, ModalHeader, ModalLayout } from '../../..';
import { cnModalExampleStaticModal } from '../cnModalExampleStaticModal';

const cnModalExampleTable = cn('ModalExampleTable');

type Row = {
  id: number;
  date: string;
  change: string;
  from: string;
  to: string;
};

const rows: Row[] = [
  {
    id: 1,
    date: '13.05.2025',
    change: 'Телефон',
    from: '',
    to: '+7 (987) 654-32-10',
  },
  {
    id: 2,
    date: '15.12.2024',
    change: 'Должность',
    from: 'Младший аналитик',
    to: 'Аналитик',
  },
];

const columns: TableColumn<Row>[] = [
  {
    title: 'Дата',
    accessor: 'date',
    minWidth: 110,
  },
  {
    title: 'Изменение',
    accessor: 'change',
    minWidth: 120,
  },
  {
    title: 'Было',
    accessor: 'from',
    minWidth: 150,
  },
  {
    title: 'Стало',
    accessor: 'to',
    minWidth: 150,
  },
];

export const ModalExampleTable = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Example col={1}>
        <div ref={ref} style={{ height: 280 }} />
      </Example>
      <Modal
        container={ref}
        rootClassName={cnModalExampleStaticModal()}
        className={cnModalExampleTable('Modal')}
        isOpen
        hasOverlay={false}
        border
      >
        <ModalLayout space={{ p: 'm' }} border={[true, false]}>
          <ModalHeader onClose={() => {}}>Изменения у сотрудника</ModalHeader>
          <div className={cnModalExampleTable('TableWrapper')}>
            <Table columns={columns} rows={rows} zebraStriped />
          </div>
        </ModalLayout>
      </Modal>
    </>
  );
};
