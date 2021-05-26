import './TableNumberFilter.css';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '../../../utils/bem';
import { TextField } from '../../TextField/TextField';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';
import { FilterComponentProps } from '../filtering';

const cnNumberFilter = cn('TableNumberFilter');

type TableNumberFilterProps = FilterComponentProps & {
  title?: string;
};

export const TableNumberFilter: React.FC<TableNumberFilterProps> = ({
  onConfirm,
  filterValue,
  title,
  onCancel,
}) => {
  const [minValue, setMinValue] = useState<string | undefined | null>(filterValue?.min);
  const [maxValue, setMaxValue] = useState<string | undefined | null>(filterValue?.max);

  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // setTimeout нужен для корректного выставления автофокуса
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    });
  }, []);

  const confirmHandler = () => {
    onConfirm({
      min: minValue,
      max: maxValue,
    });
  };

  return (
    <TableFilterContainer title={title} onCancel={onCancel} onConfirm={confirmHandler}>
      <div className={cnNumberFilter('Inputs')}>
        <TextField
          id="от"
          leftSide="от"
          value={minValue}
          onChange={(e) => setMinValue(e.value)}
          form="defaultBrick"
          size="m"
          inputRef={textFieldRef}
        />
        <TextField
          leftSide="до"
          id="до"
          value={maxValue}
          onChange={(e) => setMaxValue(e.value)}
          form="clearDefault"
          size="m"
        />
      </div>
    </TableFilterContainer>
  );
};
