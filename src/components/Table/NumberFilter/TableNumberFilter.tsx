import './TableNumberFilter.css';

import React, { useRef, useState } from 'react';

import { cn } from '../../../utils/bem';
import { TextField } from '../../TextField/TextField';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';
import { FilterComponentProps } from '../filtering';

const cnNumberFilter = cn('TableNumberFilter');

type Item = {
  min?: string;
  max?: string;
};

type TableNumberFilterProps = FilterComponentProps & {
  title?: string;
};

export const TableNumberFilter: React.FC<TableNumberFilterProps> = ({
  onConfirm,
  filterValue,
  title,
  onCancel,
}) => {
  const [minValue, setMinValue] = useState<string | undefined | null>(
    (filterValue as Item)?.min,
  );
  const [maxValue, setMaxValue] = useState<string | undefined | null>(
    (filterValue as Item)?.max,
  );

  const textFieldRef = useRef<HTMLInputElement>(null);

  const confirmHandler = () => {
    onConfirm({
      min: minValue,
      max: maxValue,
    });
  };

  return (
    <TableFilterContainer
      title={title}
      onCancel={onCancel}
      onConfirm={confirmHandler}
    >
      <div className={cnNumberFilter('Inputs')}>
        <TextField
          id="от"
          leftSide="от"
          value={minValue}
          onChange={(e) => setMinValue(e.value)}
          form="defaultBrick"
          size="m"
          autoFocus
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
