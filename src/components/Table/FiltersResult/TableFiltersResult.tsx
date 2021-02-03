import './TableFiltersResult.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { TableRow } from '../Table';

const defaultResultTextFunc = (count: number, total: number) =>
  `Найдено ${count} из ${total} значений`;

type Props<T> = {
  rows: T[];
  numberOfRows: number;
  getResultText?: (count: number, total: number) => string;
  onReset: () => void;
};

export const TableFiltersResult = <T extends TableRow>({
  rows,
  numberOfRows,
  getResultText = defaultResultTextFunc,
  onReset,
}: Props<T>) => {
  const filtersStatus = cn('TableFiltersResult');

  return (
    <div className={filtersStatus('Container')}>
      <Text size="s" className={filtersStatus('Text')}>
        {getResultText(rows.length, numberOfRows)}
      </Text>
      <Button label="Сбросить все фильтры" view="ghost" size="xs" onClick={onReset} />
    </div>
  );
};
