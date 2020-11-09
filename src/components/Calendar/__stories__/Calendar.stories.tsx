import React from 'react';
import { date as knobsDate } from '@storybook/addon-knobs';
import { addMonths, subYears } from 'date-fns';

import { createMetadata, createStory } from '../../../utils/storybook';
import { DateRange } from '../../../utils/types/Date';
import { Calendar } from '../Calendar';

const defaultProps = () =>
  ({
    minDate: new Date(knobsDate('minDate', subYears(new Date(), 1))),
    maxDate: new Date(knobsDate('maxDate', addMonths(new Date(), 1))),
    currentVisibleDate: new Date(knobsDate('currentVisibleDate')),
  } as const);

const CalendarSingleStoryContent = () => {
  const [date, setDate] = React.useState<Date | undefined>();

  return <Calendar type="date" value={date} onSelect={setDate} {...defaultProps()} />;
};

const CalendarRangeStoryContent = () => {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return <Calendar type="date-range" value={date} onSelect={setDate} {...defaultProps()} />;
};

export const CalendarSingleStory = createStory(() => <CalendarSingleStoryContent />, {
  name: 'Выбор даты',
});

export const CalendarRangeStory = createStory(() => <CalendarRangeStoryContent />, {
  name: 'Выбор диапазона дат',
});

export default createMetadata({
  title: 'Components|/Calendar',
});
