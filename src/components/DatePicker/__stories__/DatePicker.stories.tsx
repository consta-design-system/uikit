import React from 'react';
import { date as knobsDate, select } from '@storybook/addon-knobs';
import { add, addMonths, endOfYear, isValid, startOfYear, subYears } from 'date-fns';

import { createMetadata, createStory } from '../../../utils/storybook';
import { DatePicker } from '../DatePicker';
import { getDateMidnightFromString, getInputValue } from '../DatePickerInputDate/helpers';
import { DateRange, MinMaxDate, sizes } from '../types';

const setInputValue = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = getDateMidnightFromString(value);

  return isValid(date) ? date : undefined;
};

const defaultProps = () =>
  ({
    minDate: new Date(knobsDate('minDate', subYears(new Date(), 1))),
    maxDate: new Date(knobsDate('maxDate', addMonths(new Date(), 1))),
    size: select('size', sizes, sizes[1]),
  } as const);

const DakePickerSingleStoryContent = () => {
  const [date, setDate] = React.useState<Date | undefined>();

  return <DatePicker type="date" value={date} onChange={setDate} {...defaultProps()} />;
};

export const DakePickerSingleStory = createStory(() => <DakePickerSingleStoryContent />, {
  name: 'Выбор даты',
});
const datePatten = '[0-9]{4}-[0-9]{2}-[0-9]{2}';

const DatePickerThirdPartyInputStoryContent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2019, 3, 1));

  return (
    <DatePicker
      type="date"
      value={date}
      onChange={setDate}
      {...defaultProps()}
      renderControls={({ size, value, onChange }): React.ReactNode => {
        const formattedValue = getInputValue(value);

        return (
          <input
            type="text"
            pattern={datePatten}
            value={formattedValue || undefined}
            onChange={(event) => {
              onChange(setInputValue(event.target.value));
            }}
            className={size}
          />
        );
      }}
    />
  );
};

export const DatePickerThirdPartyInputStory = createStory(
  () => <DatePickerThirdPartyInputStoryContent />,
  { name: 'Выбор даты с сторонним инпутом' },
);

const DatePickerRangeStoryContent = () => {
  const [range, setRange] = React.useState<DateRange | undefined>([undefined, undefined]);

  return <DatePicker type="date-range" value={range} onChange={setRange} {...defaultProps()} />;
};

export const DatePickerRangeStory = createStory(() => <DatePickerRangeStoryContent />, {
  name: 'Выбор диапазона дат',
});

const DatePickerRangeThirdPartyInputStoryContent = () => {
  const [range, setRange] = React.useState<DateRange | undefined>([undefined, undefined]);

  return (
    <DatePicker
      type="date-range"
      value={range}
      onChange={setRange}
      {...defaultProps()}
      renderControls={({ size, value, onChange }) => {
        const formattedRange = (value || []).map(getInputValue);
        return (
          <>
            <input
              type="text"
              pattern={datePatten}
              value={formattedRange[0] || undefined}
              onChange={(event) => {
                onChange([setInputValue(event.target.value), (value && value[1]) || undefined]);
              }}
              className={size}
            />
            <input
              type="text"
              pattern={datePatten}
              value={formattedRange[1] || undefined}
              onChange={(event) => {
                onChange([(value && value[0]) || undefined, setInputValue(event.target.value)]);
              }}
              className={size}
            />
          </>
        );
      }}
    />
  );
};

export const DatePickerRangeThirdPartyInputStory = createStory(
  () => <DatePickerRangeThirdPartyInputStoryContent />,
  {
    name: 'Выбор диапазона дат с сторонними инпутами',
  },
);

const DatePickerRangeCustomRangesStoryContent = () => {
  const [range, setRange] = React.useState<DateRange | undefined>([undefined, undefined]);
  const makePreparedRanges = ({
    date,
  }: {
    date: Date;
  } & MinMaxDate): Array<{ range: DateRange; title: string }> => {
    const currentYear = date.getFullYear();
    const startDate = startOfYear(date);
    const endDate = endOfYear(date);
    const middleDate = add(startDate, { months: 6 });
    return [
      { title: `1 пол. ${currentYear}`, range: [startDate, middleDate] },
      { title: `2 пол. ${currentYear}`, range: [middleDate, endDate] },
    ];
  };

  return (
    <DatePicker
      type="date-range"
      value={range}
      onChange={setRange}
      makePreparedRanges={makePreparedRanges}
      {...defaultProps()}
    />
  );
};

export const DatePickerRangeCustomRangesStory = createStory(
  () => <DatePickerRangeCustomRangesStoryContent />,
  {
    name: 'Выбор диапазона дат с кастомными подготовленными периодами',
  },
);

export default createMetadata({
  title: 'Components|/DatePicker',
});
