import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleTypeDate = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="date"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeDateRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="date-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeDateTime = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="date-time"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeDateTimeRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="date-time-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeTime = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <Example col={1}>
      <DatePicker
        type="time"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeMonth = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <Example col={1}>
      <DatePicker
        type="month"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeMonthRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="month-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeYear = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <Example col={1}>
      <DatePicker
        type="year"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};

export const DatePickerExampleTypeYearRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="year-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </Example>
  );
};
