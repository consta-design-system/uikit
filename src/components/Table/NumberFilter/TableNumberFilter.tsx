import './TableNumberFilter.css';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '../../../utils/bem';
import { isNotNil } from '../../../utils/type-guards';
import { TextField } from '../../TextField/TextField';
import { CustomFilterComponentProps } from '../customFiltering';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';

const cnNumberFilter = cn('TableNumberFilter');

type Props = CustomFilterComponentProps & {
  title?: string;
};

export const TableNumberFilter: React.FC<Props> = ({
  onConfirm,
  savedCustomFilterValue,
  title,
  onCancel,
}) => {
  const [minValue, setMinValue] = useState<string | undefined | null>(savedCustomFilterValue?.min);
  const [maxValue, setMaxValue] = useState<string | undefined | null>(savedCustomFilterValue?.max);

  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    });
  }, []);

  const confirmHandler = () => {
    onConfirm({
      value: {
        min: minValue,
        max: maxValue,
      },
      isActive: isNotNil(minValue) || isNotNil(maxValue),
    });
  };

  return (
    <TableFilterContainer title={title} onCancel={onCancel} onConfirm={confirmHandler}>
      <div className={cnNumberFilter('Inputs')}>
        <TextField
          leftSide="от"
          value={minValue}
          onChange={(e) => setMinValue(e.value)}
          form="defaultBrick"
          size="m"
          inputRef={textFieldRef}
        />
        <TextField
          leftSide="до"
          value={maxValue}
          onChange={(e) => setMaxValue(e.value)}
          form="clearDefault"
          size="m"
        />
      </div>
    </TableFilterContainer>
  );
};
