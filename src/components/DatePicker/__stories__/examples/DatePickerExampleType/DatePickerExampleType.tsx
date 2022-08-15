import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleTypeDate = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeDateRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeDateTime = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-time"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeDateTimeRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-time-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeTime = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="time"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeMonth = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="month"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeMonthRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="month-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeYear = () => {
  const [value, setValue] = useState<Date | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="year"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeYearRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="year-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        style={{ zIndex: 2 }}
      />
    </StoryBookExample>
  );
};
