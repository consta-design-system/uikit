import { Example } from '@consta/stand';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';

import { Tooltip } from '../../../../Tooltip/Tooltip';
import {
  DatePicker,
  DatePickerPropOnChange,
  DatePickerPropOnError,
} from '../../../DatePicker';

const minDate = new Date(2000, 1, 1);
const maxDate = new Date(2001, 1, 1);
const formatDate = (date: Date) => format(date, 'dd.MM.yyyy');

export const DatePickerExampleOnError = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  const [error, setError] = useState<string | undefined>();

  const onChange: DatePickerPropOnChange<'date-range'> = ({ value }) => {
    setValue(value);
    setError(undefined);
  };

  const onError: DatePickerPropOnError = (props) => {
    if (props.type === 'outOfRange') {
      setError(
        `Дата ${formatDate(props.date)} не в ходит в диапазон c ${formatDate(
          minDate,
        )} по ${formatDate(maxDate)}`,
      );
    }
    if (props.type === 'invalidInputAttempt') {
      setError(`Даты ${props.stringValue} не существует`);
    }
    if (props.type === 'startDateIsGreaterThanEndDate') {
      setError(
        `Дата начала (${formatDate(
          props.date[0],
        )}) больше чем дата конца (${formatDate(props.date[1])})`,
      );
    }
  };

  return (
    <>
      <Example col={1}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          ref={ref}
          status={error ? 'alert' : undefined}
          value={value}
          onChange={onChange}
          type="date-range"
          onError={onError}
        />
      </Example>
      {error && (
        <Tooltip status="alert" anchorRef={ref}>
          {error}
        </Tooltip>
      )}
    </>
  );
};
