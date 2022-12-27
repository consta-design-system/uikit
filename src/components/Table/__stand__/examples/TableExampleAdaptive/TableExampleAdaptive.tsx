import { Example } from '@consta/stand';
import React from 'react';

import { useBreakpoints } from '../../../../../hooks/useBreakpoints/useBreakpoints';
import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { Badge } from '../../../../Badge/Badge';
import { Card } from '../../../../Card/Card';
import { Text } from '../../../../Text/Text';
import { Table, TableColumn } from '../../../Table';

const rowsProf = [
  {
    id: '1',
    name: 'Антон',
    profession: 'Cтроитель, который построил дом',
    status: 'недоступен',
  },
  {
    id: '2',
    name: 'Василий',
    profession: 'Отвечает на вопросы, хотя его не спросили',
    status: 'на связи',
  },
];

const columns: TableColumn<typeof rowsProf[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    width: 30,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    width: 300,
    sortable: true,
  },
  {
    title: 'Профессия',
    accessor: 'profession',
    width: 200,
    sortable: true,
  },
  {
    title: 'Статус',
    accessor: 'status',
    width: 200,
    sortable: true,
  },
];

export function TableExampleAdaptiveScroll() {
  return (
    <Example col={1} style={{ maxWidth: 500 }}>
      <Table columns={columns} rows={rowsProf} />
    </Example>
  );
}

export const TableExampleAdaptiveScrollUseBreakpoints = () => {
  const { desktop } = useBreakpoints({ desktop: 800 });

  if (desktop) {
    return <Table columns={columns} rows={rowsProf} />;
  }

  return (
    <div>
      {rowsProf.map((item, index) => (
        <div key={index}>
          <Card
            verticalSpace="l"
            horizontalSpace="l"
            className={cnMixSpace({ mB: 'l' })}
            style={{ maxWidth: 400 }}
          >
            <Text weight="bold" className={cnMixSpace({ mB: 's' })}>
              {item.name}
            </Text>
            <Text className={cnMixSpace({ mB: 's' })}>{item.profession}</Text>
            <Badge label={item.status} status="system" />
          </Card>
        </div>
      ))}
    </div>
  );
};
